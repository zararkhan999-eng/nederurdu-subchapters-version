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

Before every release: `npm run audit:course`, `npm test`, `npm run android:sync-web`,
then raise `versionCode` in `android/app/build.gradle`.

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
