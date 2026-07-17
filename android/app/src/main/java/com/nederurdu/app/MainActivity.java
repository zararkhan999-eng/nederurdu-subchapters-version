package com.nederurdu.app;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.media.AudioAttributes;
import android.media.AudioManager;
import android.os.Bundle;
import android.speech.tts.TextToSpeech;
import android.speech.tts.Voice;
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

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);

        textToSpeech = new TextToSpeech(this, this);
        webView.addJavascriptInterface(new NederUrduTtsBridge(), "NederUrduTts");

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
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
            return;
        }
        super.onBackPressed();
    }

    @Override
    protected void onDestroy() {
        if (textToSpeech != null) {
            textToSpeech.stop();
            textToSpeech.shutdown();
        }
        super.onDestroy();
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
