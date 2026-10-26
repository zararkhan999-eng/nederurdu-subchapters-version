const CACHE_NAME = "nederurdu-v94-a1-grammar";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./duo.css",
  "./experience.css",
  "./immersive.css",
  "./landing.css",
  "./brand-system.css",
  "./course-data.js",
  "./word-visual-data.js",
  "./audio/nl/manifest.js",
  "./assets/word-visuals/offline-manifest.json",
  "./app.js",
  "./app.js?v=94",
  "./motion.js",
  "./motion.js?v=94",
  "./sound.js",
  "./sound.js?v=94",
  "./playful.css",
  "./world.css",
  "./world.css?v=94",
  "./pim-parts.js",
  "./pim-parts.js?v=94",
  "./cat.js",
  "./cat.js?v=94",
  "./pim.js",
  "./pim.js?v=94",
  "./guide.js",
  "./guide.js?v=94",
  "./guide.css",
  "./guide.css?v=94",
  "./refresh.css",
  "./refresh.css?v=94",
  "./street.js",
  "./map.js",
  "./lesson.js",
  "./rewards.js",
  "./rewards.js?v=94",
  "./rewards.css",
  "./screens.css",
  "./screens.css?v=94",
  "./rewards.css?v=94",
  "./lesson.js?v=94",
  "./lesson.css",
  "./lesson.css?v=94",
  "./map.js?v=94",
  "./street.js?v=94",
  "./playful.css?v=94",
  "./open-door.js",
  "./open-door.js?v=94",
  "./open-door-layout.css",
  "./open-door.css",
  "./open-door.css?v=94",
  "./assets/fonts/dm-sans.ttf",
  "./assets/fonts/noto-sans-arabic.ttf",
  "./assets/fonts/noto-naskh-arabic.ttf",
  "./manifest.webmanifest",
  "./icon.svg",
  "./assets/visuals/letters-first-words.svg",
  "./assets/visuals/people-family.svg",
  "./assets/visuals/home-place.svg",
  "./assets/visuals/transport-routine.svg",
  "./assets/visuals/body-health.svg",
  "./assets/visuals/daily-services.svg",
  "./assets/visuals/sentence-practice.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const visualManifestResponse = await fetch("./assets/word-visuals/offline-manifest.json");
    const visualAssets = (await visualManifestResponse.json())
      .map((asset) => `./${String(asset).replace(/^\.?\//, "")}`);
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll([...new Set([...APP_SHELL, ...visualAssets])]);
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

// Recorded Dutch clips are named by a hash of their content, so a cached clip
// never goes stale. They are cached on first play, keyed by URL: audio
// elements send Range requests, and partial responses cannot be cached.
function respondWithSpeechClip(url) {
  return caches.match(url).then((cached) => cached || fetch(url).then((response) => {
    if (response.status === 200) {
      const copy = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(url, copy));
    }
    return response;
  }));
}

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin === self.location.origin && /\/audio\/nl\/[^/]+\.ogg$/.test(url.pathname)) {
    event.respondWith(respondWithSpeechClip(url.href));
    return;
  }
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
