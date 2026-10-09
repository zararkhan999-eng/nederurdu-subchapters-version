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

The repository includes its own Gradle wrapper (`./gradlew`). The Gradle
daemon runs on Java 21 (see `gradle/gradle-daemon-jvm.properties`); Gradle
finds an installed JDK 21 automatically, whatever `java` is on your PATH.
Install one with Android Studio or from adoptium.net if it is missing.

```bash
npm run android:debug
npm run android:bundle
```

The project targets Android 16 (API 36). Install the SDK platform with
`sdkmanager "platforms;android-36" "build-tools;36.0.0"` if Gradle reports it
missing.

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
