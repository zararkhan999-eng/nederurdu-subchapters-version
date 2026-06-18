package com.nederurdu.app;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.os.Bundle;
import android.speech.tts.TextToSpeech;
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

public class MainActivity extends Activity implements TextToSpeech.OnInitListener {
    private WebView webView;
    private TextToSpeech textToSpeech;
    private boolean textToSpeechReady = false;

    @Override
    @SuppressLint("SetJavaScriptEnabled")
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);

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

        int languageResult = textToSpeech.setLanguage(new Locale("nl", "NL"));
        textToSpeechReady = languageResult != TextToSpeech.LANG_MISSING_DATA
                && languageResult != TextToSpeech.LANG_NOT_SUPPORTED;
        if (!textToSpeechReady) {
            Log.w("NederUrduTts", "Dutch text-to-speech voice is not available");
        }
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
        public boolean speak(String text) {
            if (!textToSpeechReady || textToSpeech == null || text == null || text.trim().isEmpty()) {
                Log.w("NederUrduTts", "Speak request skipped; text-to-speech is not ready");
                return false;
            }

            textToSpeech.stop();
            int result = textToSpeech.speak(text, TextToSpeech.QUEUE_FLUSH, null, "nederurdu-tts");
            Log.i("NederUrduTts", "Speak request for: " + text + " result=" + result);
            return result == TextToSpeech.SUCCESS;
        }
    }
}
