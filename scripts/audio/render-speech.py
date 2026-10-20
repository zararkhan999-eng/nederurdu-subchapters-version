"""Render every Dutch speech text to an Opus clip with the Piper "pim" voice.

Reads scripts/audio/speech-texts.json (from collect-speech-texts.js) and writes
audio/nl/<id>.ogg (regular speed), audio/nl/<id>-slow.ogg (slow speed) and
audio/nl/manifest.js, which maps each text to its clip id and durations.

Clip ids hash the voice, speeds and the exact text sent to the voice, so a
re-run only renders new or changed texts, and clips nothing refers to any more
are deleted.

Setup once:  npm run audio:setup      Render:  npm run audio:render
"""
import hashlib
import json
import re
import sys
import tarfile
import urllib.request
from pathlib import Path

try:
    import numpy as np
    import sherpa_onnx
    import soundfile as sf
    import soxr
except ImportError as error:
    sys.exit(f"Missing Python package ({error.name}). Run: npm run audio:setup")

ROOT = Path(__file__).resolve().parents[2]
TEXTS = Path(__file__).with_name("speech-texts.json")
PRONUNCIATIONS = Path(__file__).with_name("pronunciations.json")
OUT = ROOT / "audio" / "nl"
CACHE = Path.home() / ".cache" / "nederurdu-tts"

VOICE = "nl_NL-pim-medium"
MODEL_URL = f"https://github.com/k2-fsa/sherpa-onnx/releases/download/tts-models/vits-piper-{VOICE}.tar.bz2"
REGULAR_SPEED = 1.0
# The app's slow rates are about 0.83 of its regular rates (see getDutchSpeechRate).
SLOW_SPEED = 0.83
SAMPLE_RATE = 24000  # an Opus-native rate; Piper renders at 22050
OPUS_LEVEL = 0.93  # about 27 kbit/s, as clear as AAC at 40 kbit/s for this voice
RENDER_VERSION = 1  # bump to re-render everything after changing trimming or encoding

LETTER_NAMES = {
    "a": "aa", "b": "bee", "c": "cee", "d": "dee", "e": "ee", "f": "ef", "g": "gee", "h": "haa",
    "i": "ie", "j": "jee", "k": "kaa", "l": "el", "m": "em", "n": "en", "o": "oo", "p": "pee",
    "q": "kuu", "r": "er", "s": "es", "t": "tee", "u": "uu", "v": "vee", "w": "wee", "x": "iks",
    "y": "griekse ij", "z": "zet",
}
HOURS = ["twaalf", "één", "twee", "drie", "vier", "vijf", "zes", "zeven", "acht", "negen", "tien", "elf",
         "twaalf", "dertien", "veertien", "vijftien", "zestien", "zeventien", "achttien", "negentien",
         "twintig", "eenentwintig", "tweeëntwintig", "drieëntwintig"]
MONTHS = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september",
          "oktober", "november", "december"]


def spell(letters):
    return " ".join(LETTER_NAMES[letter.lower()] for letter in letters)


def clock(match):
    hour, minute = int(match[1]), int(match[2])
    if minute == 0:
        return f"{HOURS[hour]} uur"
    if minute == 30:
        return f"half {HOURS[(hour + 1) % 24 if hour + 1 < 13 else (hour + 1) % 12]}"
    return f"{HOURS[hour]} uur {minute}"


def prepare(text, overrides):
    """Turn the text the app shows into the text the voice should read."""
    if text in overrides:
        return overrides[text]
    if len(text) == 1 and text.lower() in LETTER_NAMES:
        return LETTER_NAMES[text.lower()]
    spoken = re.sub(r"^letter ([a-z])$", lambda m: f"letter {LETTER_NAMES[m[1]]}", text)
    # Arrows become pauses: "a → appel" -> "aa, appel", "links ←, rechts →" -> "links, rechts".
    # Single letters only get their names here, so the pronoun "u" elsewhere stays a word.
    if re.search(r"[→←↑↓]", spoken):
        spoken = re.sub(r"\s*[→←↑↓]\s*", ", ", spoken)
        spoken = re.sub(r"(,\s*)+", ", ", spoken).strip(" ,")
        spoken = re.sub(r"(?<![\w’'])([a-z])(?![\w’'])", lambda m: LETTER_NAMES[m[1]], spoken)
    # Dialogue lines: "A: Hallo!, B: Hallo!" -> "Hallo! Hallo!"
    spoken = re.sub(r"(^|,\s*)[AB]:\s*", r"\1", spoken).replace("!,", "!").replace(".,", ".")
    spoken = re.sub(r"\b(\d{1,2}):(\d{2})\b", clock, spoken)
    spoken = re.sub(r"\b(\d{1,2})-(\d{1,2})-(\d{4})\b", lambda m: f"{int(m[1])} {MONTHS[int(m[2]) - 1]} {m[3]}", spoken)
    spoken = re.sub(r"\bbel 112\b", "bel één één twee", spoken)
    spoken = re.sub(r"€\s?(\d+)", r"\1 euro", spoken)
    spoken = re.sub(r"\b(\d{4}) ([A-Z]{2})\b", lambda m: f"{m[1][:2]} {m[1][2:]} {spell(m[2])}", spoken)
    spoken = re.sub(r"\b(BSN|bsn|AB)\b", lambda m: spell(m[1]), spoken)
    return spoken


def load_voice():
    model_dir = CACHE / f"vits-piper-{VOICE}"
    if not (model_dir / f"{VOICE}.onnx").exists():
        CACHE.mkdir(parents=True, exist_ok=True)
        archive = CACHE / f"{VOICE}.tar.bz2"
        print(f"Downloading {VOICE} voice …")
        urllib.request.urlretrieve(MODEL_URL, archive)
        with tarfile.open(archive) as tar:
            tar.extractall(CACHE, filter="data") if sys.version_info >= (3, 12) else tar.extractall(CACHE)
        archive.unlink()
    config = sherpa_onnx.OfflineTtsConfig(model=sherpa_onnx.OfflineTtsModelConfig(
        vits=sherpa_onnx.OfflineTtsVitsModelConfig(
            model=str(model_dir / f"{VOICE}.onnx"),
            tokens=str(model_dir / "tokens.txt"),
            data_dir=str(model_dir / "espeak-ng-data")),
        num_threads=4))
    return sherpa_onnx.OfflineTts(config)


def trim(samples, rate, lead_ms=30, tail_ms=120, threshold_db=-45):
    """Cut the voice's built-in silence so playback starts promptly."""
    level = np.abs(samples)
    loud = np.flatnonzero(level > level.max() * 10 ** (threshold_db / 20))
    if not len(loud):
        return samples
    start = max(0, loud[0] - rate * lead_ms // 1000)
    end = min(len(samples), loud[-1] + rate * tail_ms // 1000)
    return samples[start:end]


def render(tts, spoken, speed, path):
    audio = tts.generate(spoken, sid=0, speed=speed)
    samples = trim(np.asarray(audio.samples, dtype=np.float32), audio.sample_rate)
    samples = soxr.resample(samples, audio.sample_rate, SAMPLE_RATE)
    # A short fade keeps the cut edges from clicking.
    fade = min(len(samples) // 4, SAMPLE_RATE // 200)
    if fade:
        samples[:fade] *= np.linspace(0, 1, fade)
        samples[-fade:] *= np.linspace(1, 0, fade)
    sf.write(path, samples, SAMPLE_RATE, format="OGG", subtype="OPUS", compression_level=OPUS_LEVEL)
    return round(len(samples) * 1000 / SAMPLE_RATE)


def clip_id(spoken):
    key = f"{RENDER_VERSION}|{VOICE}|{REGULAR_SPEED}|{SLOW_SPEED}|{OPUS_LEVEL}|{spoken}"
    return hashlib.sha1(key.encode("utf-8")).hexdigest()[:10]


def read_manifest():
    path = OUT / "manifest.js"
    if not path.exists():
        return {}
    body = path.read_text(encoding="utf-8")
    return json.loads(body[body.index("{"):body.rindex("}") + 1]).get("clips", {})


def main():
    texts = json.loads(TEXTS.read_text(encoding="utf-8"))
    overrides = json.loads(PRONUNCIATIONS.read_text(encoding="utf-8")) if PRONUNCIATIONS.exists() else {}
    OUT.mkdir(parents=True, exist_ok=True)
    previous = {entry[0]: entry for entry in read_manifest().values()}

    clips, rendered, tts = {}, 0, None
    for index, text in enumerate(texts, 1):
        spoken = prepare(text, overrides)
        cid = clip_id(spoken)
        regular, slow = OUT / f"{cid}.ogg", OUT / f"{cid}-slow.ogg"
        known = previous.get(cid)
        if known and regular.exists() and slow.exists():
            clips[text] = known
            continue
        tts = tts or load_voice()
        clips[text] = [cid, render(tts, spoken, REGULAR_SPEED, regular), render(tts, spoken, SLOW_SPEED, slow)]
        rendered += 1
        if rendered % 100 == 0:
            print(f"  {index}/{len(texts)} …", flush=True)

    keep = {f"{entry[0]}{suffix}.ogg" for entry in clips.values() for suffix in ("", "-slow")}
    removed = 0
    for path in OUT.glob("*.ogg"):
        if path.name not in keep:
            path.unlink()
            removed += 1

    manifest = {"voice": VOICE, "format": "ogg", "clips": dict(sorted(clips.items()))}
    (OUT / "manifest.js").write_text(
        "// Generated by scripts/audio/render-speech.py. Text -> [clip id, regular ms, slow ms].\n"
        f"window.NEDERURDU_AUDIO = {json.dumps(manifest, ensure_ascii=False, separators=(',', ':'))};\n",
        encoding="utf-8")
    size = sum(path.stat().st_size for path in OUT.glob("*.ogg"))
    print(f"{len(clips)} texts: {rendered} rendered, {removed} stale clips removed, "
          f"{size / 1024 / 1024:.1f} MB in {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
