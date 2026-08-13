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

The repository includes its own Gradle wrapper (`./gradlew`), so a separate
system Gradle installation is not required. On macOS, point the command line at
Android Studio's bundled Java runtime before building:

```bash
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
npm run android:debug
npm run android:bundle
```

The first command-line build may download the wrapper's pinned Gradle version
and Android dependencies. Android Studio can also run the same wrapper and use
its bundled Java runtime automatically.

## Production Signing

Release builds look for the private, Git-ignored file
`android/key.properties`. Start from `android/key.properties.example` and keep
the real values and upload key outside Git. The configured `storeFile` path is
relative to the repository root.

When `android/key.properties` is absent, `bundleRelease` stops with an error so
an unsigned file cannot be mistaken for a Play Store bundle. Use
`./gradlew :app:assembleRelease` when only an unsigned compile check is needed.
When the file and upload key are present, `bundleRelease` produces the signed
bundle at
`android/app/build/outputs/bundle/release/app-release.aab`.

Before upload, verify the bundle with `jarsigner -verify` and confirm that the
release row in `./gradlew :app:signingReport` names the intended private upload
key rather than the Android debug key.
