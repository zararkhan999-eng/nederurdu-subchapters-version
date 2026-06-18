# NederUrdu Mobile Build

NederUrdu now includes a native Android wrapper around the existing web app. The Android app loads the packaged files from `android/app/src/main/assets/public/index.html`, so it does not need a website URL to start.

## Local Web App

```bash
npm start
```

Open `http://127.0.0.1:4173`.

## Sync Web Files Into Android

Run this after changing `index.html`, `styles.css`, JavaScript, the manifest, icon, or assets:

```bash
npm run android:sync-web
```

## Build In Android Studio

1. Open this project folder in Android Studio.
2. Let Android Studio install the Android SDK and Gradle dependencies.
3. Build and run the `app` module on a real Android phone.
4. For Play Store upload, generate a signed Android App Bundle.

## Command-Line Builds

If Gradle is installed locally:

```bash
npm run android:debug
npm run android:bundle
```

This environment does not currently include Gradle, so the first full build should be done through Android Studio or after installing Gradle.
