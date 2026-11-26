# NederUrdu

A mobile-first Dutch learning prototype for Urdu-speaking beginners.

## Run

```bash
node server.js
```

Then open:

```text
http://127.0.0.1:4173
```

## Android App

NederUrdu includes an Android wrapper that packages the web app locally, so the Play Store app does not need a website URL to open.

After changing web files, sync them into the Android app:

```bash
node scripts/sync-android-web.js
```

Then open this folder in Android Studio and build the `app` module. See `docs/mobile-build.md` and `docs/store-listing/release-checklist.md` for release steps.

## Google Play release

- Release checklist (what is done, and the signing and Play Console steps): `docs/store-listing/release-checklist.md`
- Listing text, data safety, and content rating answers: `docs/store-listing/google-play.md`
- Store icon, feature graphic, and phone screenshots: `docs/store-listing/`
  (`node scripts/render-store-graphics.js` regenerates the icon and feature graphic)
- Privacy policy page to host: `docs/privacy-policy.html`

Before every release: `npm run audit:course`, `npm run audit:audio`, `npm test`,
`npm run android:sync-web`, then raise `versionCode` in `android/app/build.gradle`.

## Recorded Dutch audio

Dutch is spoken from recorded clips made with Kyutai's open-source
[Pocket TTS](https://github.com/kyutai-labs/pocket-tts): its large Dutch model
(`dutch_24l`) and built-in Dutch speaker "daan". It replaced the Piper
`nl_NL-pim-medium` voice in November 2026 because it sounds far more natural,
and in a Whisper test it was the only voice understood with no errors. Every
course text has a regular and a slow clip in `audio/nl/` (Opus, about
27 kbit/s), listed in `audio/nl/manifest.js`. The slow clip is the regular take
stretched with [Rubber Band](https://breakfastquay.com/rubberband/), which keeps
the pitch. Texts without a clip, and browsers that cannot play Opus, fall back
to the phone's own Dutch voice as before.

Licences: Pocket TTS weights are CC BY 4.0 (Kyutai), and the "daan" voice comes
from the CML-TTS dataset (CC BY 4.0). Both need a credit, which is in
`audio/nl/CREDITS.txt`; keep it with the clips and add it to the store listing
or an About screen.

After adding or changing Dutch course text (needs [uv](https://docs.astral.sh/uv/)
and Rubber Band: `brew install uv rubberband`):

```bash
npm run audio:setup   # once: Python 3.12 packages in scripts/audio/.venv
npm run audio:build   # list every spoken text, render only new or changed ones
npm run audio:check   # Whisper lists clips where the voice swallowed or added words
npm run audit:audio   # fails if any spoken text has no clip
```

The voice is generative, so a take can occasionally come out wrong.
`npm run audio:check -- --reroll` gives every failing text a new seed in
`scripts/audio/seeds.json`; run `npm run audio:render` again to record new
takes. The first build downloads the model (about 650 MB) to the Hugging Face
cache and takes about an hour for the whole course. Fix a word the voice says
wrongly by adding a respelling to `scripts/audio/pronunciations.json`
(`{"shown text": "text to read"}`), then run `npm run audio:render` again.
Times, prices, dates and letter names are rewritten for the voice in
`prepare()` in `scripts/audio/render-speech.py`.

## Learning design

The permanent curriculum rules live in
[`docs/learning-first-curriculum-roadmap.md`](docs/learning-first-curriculum-roadmap.md).
Every normal lesson follows one continuous journey:

**Preview → Learn → Understand → Guided Practice → Use → Independent Check →
Correction**

Teaching cards introduce the Dutch target before any scored activity. They
include an Urdu meaning, pronunciation help, regular and slow Dutch audio,
context, an example, and likely confusion. Exercises then move from supported
recognition to guided recall and practical use. The final check contains only
material already taught in the lesson or declared as a prerequisite.

Lessons remain browseable. Skills move from **introduced** to **practiced** and
become **secure** only after an 80% Independent Check and correction of every
missed required skill. Fixed review path nodes have been replaced by adaptive,
skill-based review.

## Current scope

- Urdu-first A0, A1, and A2 chapters organized around practical daily life
- Learning runs capped by new concepts rather than fixed question quotas
- Dedicated concept and grammar teaching cards
- Dutch meaning, listening, reading, supported speaking, and practical-use work
- Real-life missions for appointments, shopping, school, transport, health,
  work, forms, messages, housing, and public services
- Specific Urdu instructions, hints, correct feedback, wrong-answer
  explanations, and supported correction retries
- Optional word-bank alternatives for typed Dutch responses
- Regular and slow `nl-NL` pronunciation
- Adaptive review based on introduced skills and prior mistakes
- Local, offline-capable progress storage with Android asset parity
- No account, backend, external AI service, or first-launch choice screen

Progress is saved under `nederurdu-progress-v4`. The app performs a one-time
migration from `nederurdu-progress-v3` and retains the old record as a recovery
backup.
