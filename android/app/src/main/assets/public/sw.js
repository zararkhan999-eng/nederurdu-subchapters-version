const CACHE_NAME = "nederurdu-v85-rewards";
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
  "./assets/word-visuals/offline-manifest.json",
  "./app.js",
  "./app.js?v=85",
  "./motion.js",
  "./motion.js?v=85",
  "./sound.js",
  "./sound.js?v=85",
  "./playful.css",
  "./world.css",
  "./world.css?v=85",
  "./cat.js",
  "./cat.js?v=85",
  "./street.js",
  "./map.js",
  "./lesson.js",
  "./rewards.js",
  "./rewards.js?v=85",
  "./rewards.css",
  "./rewards.css?v=85",
  "./lesson.js?v=85",
  "./lesson.css",
  "./lesson.css?v=85",
  "./map.js?v=85",
  "./street.js?v=85",
  "./playful.css?v=85",
  "./open-door.js",
  "./open-door.js?v=85",
  "./open-door-layout.css",
  "./open-door.css",
  "./open-door.css?v=85",
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

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
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
