const cacheName = "test-cache-1";
const contentToCache = [
  "/",
  "/index.html",
  "/styles.css",
  "/static/js/bundle.js"
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
  // console.log('fetch event on SW: ', event.request)

  if (event.request.url.includes('contacts')) {

    // console.log('network only flow: ', event.request)

    // event.respondWith(fetch(event.request));

  } else {

    event.respondWith(caches.open(cacheName).then((cache) => {
      // Go to the cache first
      return cache.match(event.request.url).then((cachedResponse) => {
        // Return a cached response if we have one
        if (cachedResponse) {
          return cachedResponse;
        }

        // Otherwise, hit the network
        return fetch(event.request).then((fetchedResponse) => {
          // Add the network response to the cache for later visits
          cache.put(event.request, fetchedResponse.clone());

          // Return the network response
          return fetchedResponse;
        });
      });
    }));

  }

});
