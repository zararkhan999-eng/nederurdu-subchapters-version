"""Listen to the recorded clips with Whisper and list the ones it cannot understand.

Pocket TTS is a generative voice: now and then a take swallows or adds a word.
This script transcribes every regular-speed clip of three or more words, compares
the transcript with the text the voice was asked to read, and lists the clips
whose character error rate is above the limit. Single words and letters are
skipped, because speech recognition is unreliable on them.

    npm run audio:check                       # report only
    npm run audio:check -- --reroll           # also give every failing text a new seed
    npm run audio:check -- --failed --reroll  # recheck only the last run's failures

After --reroll, run `npm run audio:render` to record new takes, then check again
with --failed. Failures are kept in check-report.json (not committed).
"""
import json
import re
import sys
import unicodedata
from importlib import util
from pathlib import Path

try:
    import mlx_whisper
    import soundfile as sf
    import soxr
except ImportError as error:
    sys.exit(f"Missing Python package ({error.name}). Run: npm run audio:setup")

HERE = Path(__file__).resolve().parent
spec = util.spec_from_file_location("render_speech", HERE / "render-speech.py")
render = util.module_from_spec(spec)
spec.loader.exec_module(render)

REPORT = HERE / "check-report.json"
LIMIT = 0.15  # share of characters Whisper may get wrong before a clip is listed
MODEL = "mlx-community/whisper-large-v3-turbo"  # Whisper on Apple's GPU through MLX


def words(text):
    # Whisper writes numbers as digits ("8 uur"); the voice was given words ("acht uur").
    text = re.sub(r"\b112\b", "één één twee", text)
    text = re.sub(r"\d+", lambda m: render.number(m[0]), text)
    text = unicodedata.normalize("NFC", text.lower())
    return re.sub(r"[^a-zà-ÿ0-9 ]+", " ", text).split()


def error_rate(expected, heard):
    # Spaces are left out: Whisper often writes "dankjewel" for "dank je wel".
    a, b = "".join(words(expected)), "".join(words(heard))
    row = list(range(len(b) + 1))
    for i, x in enumerate(a, 1):
        diagonal, row[0] = row[0], i
        for j, y in enumerate(b, 1):
            diagonal, row[j] = row[j], min(row[j] + 1, row[j - 1] + 1, diagonal + (x != y))
    return row[-1] / max(1, len(a))


def main():
    reroll = "--reroll" in sys.argv
    texts = json.loads(render.TEXTS.read_text(encoding="utf-8"))
    if "--failed" in sys.argv:
        failed = {entry["text"] for entry in json.loads(REPORT.read_text(encoding="utf-8"))} if REPORT.exists() else set()
        texts = [text for text in texts if text in failed]
    overrides = json.loads(render.PRONUNCIATIONS.read_text(encoding="utf-8")) if render.PRONUNCIATIONS.exists() else {}
    seeds = json.loads(render.SEEDS.read_text(encoding="utf-8")) if render.SEEDS.exists() else {}
    clips = render.read_manifest()

    checked, failures = 0, []
    for text in texts:
        spoken = render.prepare(text, overrides)
        if len(words(spoken)) < 3 or text not in clips:
            continue
        samples, rate = sf.read(render.OUT / f"{clips[text][0]}.ogg", dtype="float32")
        heard = mlx_whisper.transcribe(soxr.resample(samples, rate, 16000), path_or_hf_repo=MODEL,
                                       language="nl")["text"].strip()
        checked += 1
        rate_wrong = error_rate(spoken, heard)
        if rate_wrong > LIMIT:
            failures.append({"text": text, "spoken": spoken, "heard": heard, "error": round(rate_wrong, 2)})
            print(f"  {rate_wrong:.0%}  {spoken!r} -> {heard!r}", flush=True)
        if checked % 100 == 0:
            print(f"  {checked} checked …", flush=True)

    print(f"{checked} clips checked, {len(failures)} above {LIMIT:.0%} character errors")
    REPORT.write_text(json.dumps(failures, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    if reroll and failures:
        for failure in failures:
            seeds[failure["text"]] = seeds.get(failure["text"], 0) + 1
        render.SEEDS.write_text(json.dumps(dict(sorted(seeds.items())), ensure_ascii=False, indent=1) + "\n",
                                encoding="utf-8")
        print(f"New seeds for {len(failures)} texts in {render.SEEDS.name}; now run: npm run audio:render")


if __name__ == "__main__":
    main()
