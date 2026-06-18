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

## Version 1 Scope

- Subchapter course map for A0, A1, and A2 with daily-life goals, practice examples, and lesson groups
- Urdu-first A0 chapter for letters, basic words, tiny grammar pieces, and first sentences
- A1 chapter ordered into simple daily communication
- A2 chapter with practical daily-life and inburgering-style lessons
- Dutch to Urdu and Urdu to Dutch multiple-choice practice
- Sentence-building exercises with shuffled Dutch word tiles in A1 and A2
- Urdu hint popups for sentence-building questions
- Lesson completion screen
- Local browser progress saving
- App dashboard with chapter progress, quick actions, and lesson preview screen
- Settings screen for local sound and pronunciation toggles
- Lightweight motion: screen entrances, answer feedback, word popup, and completion celebration
- Installable web-app metadata for public testing
- Light offline fallback after a first successful load
- Browser-based Dutch pronunciation with `nl-NL` speech when available
- Generated correct and wrong answer sound effects
- Dedicated Dutch letters page with letter-name audio, Urdu pronunciation hints, and example words
- A1/A2 curriculum roadmap for future expansion into B1/B2 later
- No accounts, backend, AI, or recorded audio files yet

Progress is saved in the browser under `nederurdu-progress-v3`.
