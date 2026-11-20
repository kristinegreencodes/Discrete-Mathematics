package com.kristinegreen.discretemath;

import android.app.Activity;
import android.os.Bundle;
import android.speech.tts.TextToSpeech;
import android.speech.tts.UtteranceProgressListener;
import android.speech.tts.Voice;
import android.webkit.JavascriptInterface;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.webkit.WebViewAssetLoader;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

public class MainActivity extends Activity implements TextToSpeech.OnInitListener {
    private WebView webView;
    private TextToSpeech tts;
    private volatile boolean ttsReady = false;
    private WebViewAssetLoader assetLoader;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        webView = new WebView(this);
        webView.setBackgroundColor(0xFF0F1020);
        setContentView(webView);

        assetLoader = new WebViewAssetLoader.Builder()
                .addPathHandler("/assets/", new WebViewAssetLoader.AssetsPathHandler(this))
                .build();

        WebSettings s = webView.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setDatabaseEnabled(true);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setTextZoom(100);

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                return assetLoader.shouldInterceptRequest(request.getUrl());
            }
        });
        webView.addJavascriptInterface(new TtsBridge(), "AndroidTTS");

        tts = new TextToSpeech(this, this);
        webView.loadUrl("https://appassets.androidplatform.net/assets/www/index.html");
    }

    @Override
    public void onInit(int status) {
        if (status == TextToSpeech.SUCCESS) {
            int r = tts.setLanguage(Locale.US);
            if (r == TextToSpeech.LANG_MISSING_DATA || r == TextToSpeech.LANG_NOT_SUPPORTED) {
                tts.setLanguage(Locale.getDefault());
            }
            tts.setOnUtteranceProgressListener(new UtteranceProgressListener() {
                @Override public void onStart(String id) { js("window.onTtsState && window.onTtsState(true)"); }
                @Override public void onDone(String id) {
                    if (id != null && id.endsWith("#last")) js("window.onTtsState && window.onTtsState(false)");
                }
                @Override public void onError(String id) { js("window.onTtsState && window.onTtsState(false)"); }
                @Override public void onStop(String id, boolean interrupted) { js("window.onTtsState && window.onTtsState(false)"); }
            });
            ttsReady = true;
        }
    }

    private void js(final String code) {
        runOnUiThread(() -> { if (webView != null) webView.evaluateJavascript(code, null); });
    }

    private static List<String> chunk(String text, int max) {
        List<String> out = new ArrayList<>();
        String[] parts = text.split("(?<=[.!?;:])\\s+");
        StringBuilder cur = new StringBuilder();
        for (String p : parts) {
            if (cur.length() + p.length() + 1 > max && cur.length() > 0) {
                out.add(cur.toString());
                cur.setLength(0);
            }
            while (p.length() > max) { out.add(p.substring(0, max)); p = p.substring(max); }
            if (cur.length() > 0) cur.append(' ');
            cur.append(p);
        }
        if (cur.length() > 0) out.add(cur.toString());
        return out;
    }

    class TtsBridge {
        @JavascriptInterface
        public boolean isReady() { return ttsReady; }

        @JavascriptInterface
        public void speak(String text, float rate, float pitch) {
            if (!ttsReady || text == null) return;
            tts.stop();
            tts.setSpeechRate(rate <= 0 ? 1f : rate);
            tts.setPitch(pitch <= 0 ? 1f : pitch);
            int max = Math.min(3000, TextToSpeech.getMaxSpeechInputLength() - 10);
            List<String> chunks = chunk(text, max);
            for (int i = 0; i < chunks.size(); i++) {
                String id = "u" + i + (i == chunks.size() - 1 ? "#last" : "");
                tts.speak(chunks.get(i), i == 0 ? TextToSpeech.QUEUE_FLUSH : TextToSpeech.QUEUE_ADD, null, id);
            }
        }

        @JavascriptInterface
        public void stop() { if (tts != null) tts.stop(); }

        @JavascriptInterface
        public String voices() {
            if (!ttsReady) return "[]";
            StringBuilder sb = new StringBuilder("[");
            try {
                boolean first = true;
                for (Voice v : tts.getVoices()) {
                    if (v.getLocale() == null || !v.getLocale().getLanguage().equals("en")) continue;
                    if (v.isNetworkConnectionRequired()) continue;
                    if (!first) sb.append(',');
                    first = false;
                    sb.append('"').append(v.getName().replace("\"", "")).append('"');
                }
            } catch (Exception ignored) { }
            return sb.append(']').toString();
        }

        @JavascriptInterface
        public void setVoice(String name) {
            if (!ttsReady) return;
            try {
                for (Voice v : tts.getVoices()) {
                    if (v.getName().equals(name)) { tts.setVoice(v); return; }
                }
            } catch (Exception ignored) { }
        }
    }

    @Override
    public void onBackPressed() {
        webView.evaluateJavascript("(window.handleBack && window.handleBack()) ? 'y' : 'n'", value -> {
            if (value == null || !value.contains("y")) MainActivity.super.onBackPressed();
        });
    }

    @Override
    protected void onPause() {
        super.onPause();
        if (tts != null) tts.stop();
    }

    @Override
    protected void onDestroy() {
        if (tts != null) { tts.stop(); tts.shutdown(); }
        if (webView != null) webView.destroy();
        super.onDestroy();
    }
}
