# Google Play release checklist

Status for version **1.0.0** (`versionCode 1`). Work happens on the
`release/play-1.0` branch.

## Done in the code

- [x] Targets Android 16 (API 36), the Play requirement since 31 Aug 2026; runs on Android 8.0+ (minSdk 26)
- [x] Android Gradle plugin 9.4.1, Gradle 9.6, Java 21 for the build (`gradle/gradle-daemon-jvm.properties`)
- [x] Release build and Android lint pass (`./gradlew :app:assembleRelease :app:lintRelease`)
- [x] Edge-to-edge: header and bottom tabs clear the status and navigation bars; keyboard does not cover typing
- [x] Back gesture handled on Android 13–16 (in-app first, then leaves the app)
- [x] No internet permission; no data collection
- [x] Missing Dutch voice: the app tells the learner and opens the voice download screen
- [x] Launcher icon, themed icon, and splash screen match the launch screen
- [x] Only the files the app loads are packaged (stray "app 2.js"-style copies removed)
- [x] Tested on an Android 16 emulator: layout, back gesture, speech
- [x] Store icon, feature graphic, 7 phone screenshots, listing text: `docs/store-listing/`
- [x] Privacy policy page: `docs/privacy-policy.html`

## You need to do these (they involve your accounts or private keys)

### 1. Contact email and privacy policy URL
- Replace `CONTACT_EMAIL` in `docs/privacy-policy.html` with the support email you want to show publicly.
- Host the page. Easiest: GitHub → repository Settings → Pages → *Deploy from a branch* → `release/play-1.0` (or `main` after merging) and folder `/docs`.
  The URL will be `https://zararkhan999-eng.github.io/nederurdu-subchapters-version/privacy-policy.html`.

### 2. Create the upload key (once; keep it safe forever)
```bash
keytool -genkeypair -v -keystore ~/nederurdu-upload-key.jks -alias nederurdu-upload -keyalg RSA -keysize 2048 -validity 10000
```
- Choose a strong password and store it in a password manager. Back the `.jks` file up somewhere outside this folder (losing it means asking Google for a key reset).
- Copy `android/key.properties.example` to `android/key.properties` and fill in:
  `storeFile=/Users/<you>/nederurdu-upload-key.jks`, the passwords, and `keyAlias=nederurdu-upload`.
  This file is ignored by Git and must never be committed.

### 3. Build the signed bundle
```bash
npm run android:sync-web
./gradlew :app:bundleRelease
```
The bundle is `android/app/build/outputs/bundle/release/app-release.aab`.

### 4. Play Console
- Create the app: name *NederUrdu: Learn Dutch in Urdu*, default language English (United States) or Urdu, App, Free.
- Fill **Store listing** and **App content** from `google-play.md` (data safety: no data collected; target audience 18+; ads: no).
- Enable **Play App Signing** (default) and upload `app-release.aab` to **Testing → Closed testing**.

### 5. Closed test (new personal developer accounts)
Personal accounts created after 13 Nov 2023 must run a closed test with at
least **12 testers** who stay opted in for **14 days in a row** before
**Production** unlocks. Invite them early (Google Groups or email list), ask
them to install from the opt-in link and actually use the app, and collect
feedback. Organisation accounts are exempt.

### 6. Production
After the 14 days, apply for production access in Play Console and roll out
the same bundle (or a fixed one with a higher `versionCode`).

## For every later update
1. Make changes, then `npm run audit:course` and the Playwright tests.
2. `npm run android:sync-web`.
3. Raise `versionCode` (and `versionName`, plus `APP_VERSION` in `app.js`) in `android/app/build.gradle`.
4. `./gradlew :app:bundleRelease` and upload.
