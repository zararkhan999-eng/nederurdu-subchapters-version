from pathlib import Path
import math
import re

from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
ASSET_DIR = ROOT / "assets" / "word-visuals"
OUTPUT_DIR = ROOT / "visual-review"


def pending_ids():
    source = (ROOT / "word-visual-data.js").read_text(encoding="utf-8")
    match = re.search(r"const pendingGeneratedVisualIds = new Set\(\[(.*?)\]\);", source, re.S)
    return set(re.findall(r'"([^"]+)"', match.group(1))) if match else set()


def visual_kind(visual_id):
    people = {"man", "vrouw", "kind", "jongen", "meisje", "familie", "vader", "moeder", "broer", "zus", "collega", "docent"}
    body = {"oog", "pijn", "hoofdpijn", "buikpijn", "hoesten", "koorts", "ziek", "rust", "honger", "dorst"}
    action_hints = (
        "bellen", "betalen", "helpen", "herhalen", "koken", "kopen", "leren", "opstaan",
        "parkeren", "ruilen", "schoonmaken", "terugkomen", "alstublieft", "sorry", "graag",
        "begrijpen", "nog-een-keer", "spreken", "luisteren", "eten", "slapen", "lopen",
        "zitten", "staan", "wachten", "lezen", "schrijven", "pinnen", "hulp", "verb-"
    )
    situation_hints = (
        "gemeente", "huisarts", "ziekenhuis", "apotheek", "tandarts", "sollicitatie",
        "verzekering", "lekkage", "verwarming", "loket", "klacht", "goedemorgen",
        "goedemiddag", "goedenavond", "tot-ziens", "ambulance"
    )
    foundation_hints = (
        "letter-", "pronoun-", "article-", "modal-", "connector-", "word-", "number-"
    )
    if visual_id in people:
        return "people-body"
    if visual_id in body:
        return "people-body"
    if any(hint in visual_id for hint in action_hints):
        return "actions"
    if any(hint in visual_id for hint in situation_hints):
        return "situations"
    if visual_id in {"possessive", "dit", "dat", "hier", "daar", "links", "rechts", "rechtdoor"} or visual_id.startswith(foundation_hints):
        return "foundations"
    return "objects-places"


def create_sheet(name, paths):
    tile = 210
    label_height = 28
    columns = 5
    rows = max(1, math.ceil(len(paths) / columns))
    sheet = Image.new("RGB", (columns * tile, rows * (tile + label_height)), "#f4f6f7")
    draw = ImageDraw.Draw(sheet)

    for index, path in enumerate(paths):
        image = Image.open(path).convert("RGB")
        image.thumbnail((tile - 14, tile - 14), Image.Resampling.LANCZOS)
        column = index % columns
        row = index // columns
        x = column * tile + (tile - image.width) // 2
        y = row * (tile + label_height) + (tile - image.height) // 2
        sheet.paste(image, (x, y))
        draw.text((column * tile + 8, row * (tile + label_height) + tile + 4), path.stem, fill="#20272c")

    OUTPUT_DIR.mkdir(exist_ok=True)
    sheet.save(OUTPUT_DIR / f"{name}.jpg", quality=88, optimize=True)


def main():
    pending = pending_ids()
    groups = {name: [] for name in ("foundations", "people-body", "objects-places", "actions", "situations")}
    for path in sorted(ASSET_DIR.glob("*.webp")):
        if path.stem in pending:
            continue
        groups[visual_kind(path.stem)].append(path)
    for name, paths in groups.items():
        create_sheet(name, paths)


if __name__ == "__main__":
    main()
