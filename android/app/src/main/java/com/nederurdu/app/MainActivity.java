package com.nederurdu.app;

import android.annotation.SuppressLint;
import android.app.Activity;
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
        settings.setDatabaseEnabled(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);

        textToSpeech = new TextToSpeech(this, this);
        webView.addJavascriptInterface(new NederUrduTtsBridge(), "NederUrduTts");
        webView.addJavascriptInterface(new NederUrduHapticsBridge(), "NederUrduHaptics");

        setContentView(webView);
        webView.loadUrl("file:///android_asset/public/index.html");
    }

    @Override
    public void onInit(int status) {
        if (status != TextToSpeech.SUCCESS || textToSpeech == null) {
            Log.w("NederUrduTts", "Text-to-speech initialization failed");
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

    @Override
    public void onBackPressed() {
        if (webView == null) {
            super.onBackPressed();
            return;
        }

        // Give lesson drawers and staged teaching panels the first chance to
        // handle Android Back. evaluateJavascript returns the boolean result as
        // JSON ("true"/"false"), after which normal WebView navigation remains
        // the fallback for pages without an open in-app surface.
        webView.evaluateJavascript(
                "window.handleNederUrduBack ? window.handleNederUrduBack() : false",
                handled -> {
                    if ("true".equals(handled)) return;
                    if (webView.canGoBack()) {
                        webView.goBack();
                    } else {
                        MainActivity.super.onBackPressed();
                    }
                });
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
            if (Build.VERSION.SDK_INT >= 26) {
                vibrator.vibrate(VibrationEffect.createWaveform(pattern, -1));
            } else {
                vibrator.vibrate(pattern, -1);
            }
        }
    }

    private class NederUrduTtsBridge {
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
