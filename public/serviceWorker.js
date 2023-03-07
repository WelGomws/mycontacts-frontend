const cacheName = "test-cache-1";
const contentToCache = [
  "/",
  "/index.html",
  "/styles.css",
  "/static/js/bundle.js",
  "/static/media/trash.svg",
  "/static/media/arrow.svg",
  "/static/media/edit.svg",
  "/static/media/logo.svg",
];

self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install");
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      console.log("[Service Worker] Caching all: app shell and content");
      await cache.addAll(contentToCache);
    })()
  );
});

self.addEventListener("fetch", (event) => {
  console.log('fetch listener on SW')
  console.log('fetch event: ', event.request)
  event.respondWith(caches.match(event.request));
});
