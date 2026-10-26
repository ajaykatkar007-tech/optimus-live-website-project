# Optimus Video Studio for Android

Native Android starter project for personal use.

## Current milestone

- Kotlin + Jetpack Compose Android application shell
- Native video picker
- Initial multi-track timeline UI
- Media3 Transformer integration for 1080p MP4 export
- GitHub Actions workflow to compile a debug APK

## Build on GitHub

1. Open the repository's **Actions** tab.
2. Select **Build Optimus Video Studio APK**.
3. Choose **Run workflow** (or wait for the branch push build).
4. Open the successful workflow run and download the `optimus-video-studio-debug-apk` artifact.
5. Extract the artifact ZIP to get `app-debug.apk`.

This is a debug APK for personal testing, not a signed release build. Advanced trimming, multi-clip composition, transitions, filters and AI features are future milestones and are not all implemented yet.

## Local build

Install JDK 17 and Gradle 8.9, then run:

```bash
gradle -p android assembleDebug
```

APK output: `android/app/build/outputs/apk/debug/app-debug.apk`
