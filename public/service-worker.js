const CACHE_NAME = 'mathscp-cache-v1';
const ASSETS = [
  '/',
  '/logo.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Pre-caching assets for offline support');
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', event => {
  console.log('Service Worker activated');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  // Only handle local HTTP/HTTPS requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then(response => {
        // Cache new successful requests
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      });
    })
  );
});
