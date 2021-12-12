const dynamicCacheName = 'dynamic-cache-v1';

self.addEventListener('install', async () => {
    console.log('Service worker has been installed');
});

self.addEventListener('activate', async () => {
    console.log('Service worker has been activated');
});

self.addEventListener('fetch', event => {
    if (event.request.method === 'GET') return event.respondWith(networkFirst(event.request));
});

async function networkFirst(req) {
    const cache = await caches.open(dynamicCacheName);
    try {
        const networkResponse = await fetch(req);
        await cache.put(req, networkResponse.clone());
        return networkResponse;
    } catch (e) {
        return cache.match(req)
    }
}
