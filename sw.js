const CACHE_NAME = 'dining-hall-dashboard-cache-v1';
const urlsToCache = [
  'index.html',
  'dining_hall.html',
  'students.json', // Include any other assets you need
  'mangu_logo.jpg',
  'blue-night_DBUU6N5YUY.jpg'
];

// Install Service Worker & Cache Core Assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch Strategy: Cache First, then Network
self.addEventListener('fetch', (event) => {
  if (event.request.url.startsWith('https')) {
    // External resources: Try network first, fallback to cache
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
  } else {
    // Internal resources: Try cache first, fallback to network
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).catch(() => {
          if (event.request.destination === 'document') {
            return caches.match('index.html'); // Fallback to homepage
          }
        });
      })
    );
  }
});

// Update Cache on Activation
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
