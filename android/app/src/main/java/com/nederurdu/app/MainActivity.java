package com.nederurdu.app;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.graphics.Insets;
import android.media.AudioAttributes;
import android.media.AudioManager;
import android.os.Build;
import android.os.Bundle;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.speech.tts.TextToSpeech;
import android.speech.tts.Voice;
import android.view.HapticFeedbackConstants;
import android.view.View;
import android.view.Window;
import android.view.WindowInsets;
import android.view.WindowInsetsController;
import android.widget.FrameLayout;
import android.window.OnBackInvokedDispatcher;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.ConsoleMessage;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import java.util.Locale;
import java.util.Set;

public class MainActivity extends Activity implements TextToSpeech.OnInitListener {
    private WebView webView;
    private TextToSpeech textToSpeech;
    private boolean textToSpeechReady = false;
    // "loading" until the engine reports back, then "ready" or "missing".
    private volatile String voiceStatus = "loading";

    @Override
    @SuppressLint("SetJavaScriptEnabled")
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        setVolumeControlStream(AudioManager.STREAM_MUSIC);

        if ((getApplicationInfo().flags & android.content.pm.ApplicationInfo.FLAG_DEBUGGABLE) != 0) {
            WebView.setWebContentsDebuggingEnabled(true);
        }
        webView = new WebView(this);
        webView.setWebViewClient(new WebViewClient());
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
                Log.d("NederUrduWebView", consoleMessage.message()
                        + " -- " + consoleMessage.sourceId()
                        + ":" + consoleMessage.lineNumber());
                return true;
            }
        });
        webView.setOverScrollMode(View.OVER_SCROLL_NEVER);
        // Hardware rendering is required for smooth motion. An earlier build
        // forced a software layer to avoid stale GPU tiles on long Urdu lesson
        // screens; if that returns on a device, restore
        // webView.setLayerType(View.LAYER_TYPE_SOFTWARE, null) here.

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        // The app is served from file:///android_asset, which these settings
        // do not affect; they only close off the rest of the file system.
        settings.setAllowFileAccess(false);
        settings.setAllowContentAccess(false);

        textToSpeech = new TextToSpeech(this, this);
        webView.addJavascriptInterface(new NederUrduTtsBridge(), "NederUrduTts");
        webView.addJavascriptInterface(new NederUrduHapticsBridge(), "NederUrduHaptics");

        FrameLayout root = new FrameLayout(this);
        root.setBackgroundColor(getColor(R.color.app_background));
        root.addView(webView, new FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.MATCH_PARENT));
        setContentView(root);
        applySystemBarInsets(root);
        registerBackCallback();
        webView.loadUrl("file:///android_asset/public/index.html");
    }

    // Android 15+ draws apps edge to edge, under the status and navigation
    // bars. Pad the WebView so the header and bottom tabs stay clear of them,
    // and so the keyboard does not cover typing exercises.
    private void applySystemBarInsets(View root) {
        if (Build.VERSION.SDK_INT < 30) return;
        WindowInsetsController controller = getWindow().getInsetsController();
        if (controller != null) {
            int light = WindowInsetsController.APPEARANCE_LIGHT_STATUS_BARS
                    | WindowInsetsController.APPEARANCE_LIGHT_NAVIGATION_BARS;
            controller.setSystemBarsAppearance(light, light);
        }
        root.setOnApplyWindowInsetsListener((view, insets) -> {
            Insets bars = insets.getInsets(WindowInsets.Type.systemBars() | WindowInsets.Type.displayCutout());
            Insets ime = insets.getInsets(WindowInsets.Type.ime());
            view.setPadding(bars.left, bars.top, bars.right, Math.max(bars.bottom, ime.bottom));
            return WindowInsets.CONSUMED;
        });
        root.requestApplyInsets();
    }

    // From Android 13 the back gesture goes through OnBackInvokedDispatcher;
    // apps targeting Android 16 no longer receive onBackPressed for it.
    private void registerBackCallback() {
        if (Build.VERSION.SDK_INT < 33) return;
        getOnBackInvokedDispatcher().registerOnBackInvokedCallback(
                OnBackInvokedDispatcher.PRIORITY_DEFAULT, this::handleBack);
    }

    // Give lesson drawers and staged teaching panels the first chance to
    // handle Back. evaluateJavascript returns the boolean result as JSON
    // ("true"/"false"); otherwise WebView history, then leaving the app.
    private void handleBack() {
        if (webView == null) {
            finish();
            return;
        }
        webView.evaluateJavascript(
                "window.handleNederUrduBack ? window.handleNederUrduBack() : false",
                handled -> {
                    if ("true".equals(handled)) return;
                    if (webView.canGoBack()) {
                        webView.goBack();
                    } else {
                        finish();
                    }
                });
    }

    @Override
    protected void onPause() {
        if (textToSpeech != null) textToSpeech.stop();
        if (webView != null) webView.onPause();
        super.onPause();
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (webView != null) webView.onResume();
    }

    @Override
    public void onInit(int status) {
        if (status != TextToSpeech.SUCCESS || textToSpeech == null) {
            Log.w("NederUrduTts", "Text-to-speech initialization failed");
            voiceStatus = "missing";
            return;
        }

        Voice preferredVoice = findPreferredDutchVoice();
        int languageResult = preferredVoice != null
                ? textToSpeech.setVoice(preferredVoice)
                : textToSpeech.setLanguage(new Locale("nl", "NL"));
        textToSpeech.setSpeechRate(0.96f);
        textToSpeech.setPitch(0.98f);
        textToSpeech.setAudioAttributes(new AudioAttributes.Builder()
                .setUsage(AudioAttributes.USAGE_MEDIA)
                .setContentType(AudioAttributes.CONTENT_TYPE_SPEECH)
                .build());
        textToSpeechReady = languageResult != TextToSpeech.LANG_MISSING_DATA
                && languageResult != TextToSpeech.LANG_NOT_SUPPORTED;
        voiceStatus = textToSpeechReady ? "ready" : "missing";
        if (!textToSpeechReady) {
            Log.w("NederUrduTts", "Dutch text-to-speech voice is not available");
        } else if (preferredVoice != null) {
            Log.i("NederUrduTts", "Using Dutch voice: " + preferredVoice.getName());
        }
    }

    private Voice findPreferredDutchVoice() {
        if (textToSpeech == null) return null;
        Set<Voice> voices = textToSpeech.getVoices();
        if (voices == null || voices.isEmpty()) return null;

        Voice bestVoice = null;
        int bestScore = Integer.MIN_VALUE;
        for (Voice voice : voices) {
            Locale locale = voice.getLocale();
            if (locale == null || !"nl".equalsIgnoreCase(locale.getLanguage())) continue;
            if (voice.isNetworkConnectionRequired()) continue;

            String name = voice.getName() == null ? "" : voice.getName().toLowerCase(Locale.ROOT);
            int score = voice.getQuality();
            if ("NL".equalsIgnoreCase(locale.getCountry())) score += 500;
            if (name.contains("natural") || name.contains("neural")
                    || name.contains("enhanced") || name.contains("premium")) score += 200;
            if (name.contains("compact") || name.contains("espeak")) score -= 150;

            if (bestVoice == null || score > bestScore) {
                bestVoice = voice;
                bestScore = score;
            }
        }
        return bestVoice;
    }

    // Only reached below Android 13; newer versions use registerBackCallback().
    @Override
    @SuppressLint("GestureBackNavigation")
    @SuppressWarnings("deprecation")
    public void onBackPressed() {
        handleBack();
    }

    @Override
    protected void onDestroy() {
        if (textToSpeech != null) {
            textToSpeech.stop();
            textToSpeech.shutdown();
        }
        super.onDestroy();
    }

    private class NederUrduHapticsBridge {
        // Short cues use the system haptic engine; celebrations use a waveform.
        @JavascriptInterface
        public void play(String name) {
            if (name == null) return;
            runOnUiThread(() -> {
                switch (name) {
                    case "tap":
                        webView.performHapticFeedback(HapticFeedbackConstants.CLOCK_TICK);
                        break;
                    case "select":
                        webView.performHapticFeedback(HapticFeedbackConstants.VIRTUAL_KEY);
                        break;
                    case "success":
                        webView.performHapticFeedback(Build.VERSION.SDK_INT >= 30
                                ? HapticFeedbackConstants.CONFIRM : HapticFeedbackConstants.VIRTUAL_KEY);
                        break;
                    case "error":
                        webView.performHapticFeedback(Build.VERSION.SDK_INT >= 30
                                ? HapticFeedbackConstants.REJECT : HapticFeedbackConstants.LONG_PRESS);
                        break;
                    case "streak":
                        vibrate(new long[] {0, 12, 40, 12, 40, 30});
                        break;
                    case "celebrate":
                        vibrate(new long[] {0, 20, 50, 20, 50, 70});
                        break;
                    default:
                        break;
                }
            });
        }

        private void vibrate(long[] pattern) {
            Vibrator vibrator = (Vibrator) getSystemService(VIBRATOR_SERVICE);
            if (vibrator == null || !vibrator.hasVibrator()) return;
            vibrator.vibrate(VibrationEffect.createWaveform(pattern, -1));
        }
    }

    private class NederUrduTtsBridge {
        @JavascriptInterface
        public String voiceStatus() {
            return voiceStatus;
        }

        // Opens the system screen for downloading voice data, so learners
        // whose phone has no Dutch voice can add one.
        @JavascriptInterface
        public void openVoiceSettings() {
            runOnUiThread(() -> {
                try {
                    startActivity(new Intent(TextToSpeech.Engine.ACTION_INSTALL_TTS_DATA));
                } catch (ActivityNotFoundException installUnavailable) {
                    try {
                        startActivity(new Intent("com.android.settings.TTS_SETTINGS"));
                    } catch (ActivityNotFoundException settingsUnavailable) {
                        Log.w("NederUrduTts", "No screen available to install a Dutch voice");
                    }
                }
            });
        }

        @JavascriptInterface
        public boolean speakNatural(String text, float rate, float pitch) {
            if (!textToSpeechReady || textToSpeech == null || text == null || text.trim().isEmpty()) {
                Log.w("NederUrduTts", "Speak request skipped; text-to-speech is not ready");
                return false;
            }

            float safeRate = Math.max(0.55f, Math.min(rate, 1.15f));
            float safePitch = Math.max(0.85f, Math.min(pitch, 1.15f));
            textToSpeech.stop();
            textToSpeech.setSpeechRate(safeRate);
            textToSpeech.setPitch(safePitch);
            Bundle params = new Bundle();
            params.putFloat(TextToSpeech.Engine.KEY_PARAM_VOLUME, 1.0f);
            params.putFloat(TextToSpeech.Engine.KEY_PARAM_PAN, 0.0f);
            int result = textToSpeech.speak(text, TextToSpeech.QUEUE_FLUSH, params, "nederurdu-tts");
            Log.i("NederUrduTts", "Natural Dutch speak request result=" + result);
            return result == TextToSpeech.SUCCESS;
        }

        @JavascriptInterface
        public boolean speak(String text) {
            if (!textToSpeechReady || textToSpeech == null || text == null || text.trim().isEmpty()) {
                Log.w("NederUrduTts", "Speak request skipped; text-to-speech is not ready");
                return false;
            }

            textToSpeech.stop();
            Bundle params = new Bundle();
            params.putFloat(TextToSpeech.Engine.KEY_PARAM_VOLUME, 1.0f);
            params.putFloat(TextToSpeech.Engine.KEY_PARAM_PAN, 0.0f);
            int result = textToSpeech.speak(text, TextToSpeech.QUEUE_FLUSH, params, "nederurdu-tts");
            Log.i("NederUrduTts", "Speak request result=" + result);
            return result == TextToSpeech.SUCCESS;
        }
    }
}
