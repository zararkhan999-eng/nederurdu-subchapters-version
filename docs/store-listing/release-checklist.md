# Google Play Release Checklist

## Before Building
- Run `npm run android:sync-web` after changing web files.
- Open the local web app and complete a quick lesson/practice smoke test.
- Confirm the Android package id is final: `com.nederurdu.app`.
- Confirm app version in `android/app/build.gradle`.

## Android Test Build
- Open the project in Android Studio.
- Let Android Studio install Gradle and Android SDK dependencies if needed.
- Build a debug APK.
- Install it on a real Android phone.
- Test:
  - App opens without a website URL.
  - Main screens load.
  - Lessons and practice work.
  - Progress saves after closing and reopening.
  - Dutch pronunciation works where Android WebView supports it, or fails quietly.
  - Android back button behavior feels natural.
  - Text fits on small screens.

## Release Bundle
- Create a Play signing key in Android Studio or Play Console.
- Build a release Android App Bundle (`.aab`).
- Upload the `.aab` to Play Console internal testing first.

## Play Console Materials
- App icon
- Feature graphic
- Phone screenshots
- Short description
- Full description
- Privacy policy URL
- Data safety answers
- Content rating questionnaire
- Target audience declaration

## Recommended Rollout
- Internal testing
- Closed testing if required by the Play Console account
- Production only after real-device testing and at least one learner feedback pass
