/* Service Worker — Finca La Esperanza
   Guarda el "esqueleto" para que la app abra sin internet.
   Los datos NO se guardan aquí (van al Google Sheet).
   Solo hace que la pantalla cargue rápido y funcione offline. */

const CACHE = 'finca-esperanza-v7';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './logo.jpg',
  './icon-192.png',
  './icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.allSettled(ASSETS.map(a => c.add(a).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  // Nunca interceptar llamadas al Apps Script (siempre a la red)
  if (req.url.includes('script.google.com') || req.method !== 'GET') return;

  // La app: primero red, así llegan versiones nuevas rápido
  const esApp = req.mode === 'navigate' || req.destination === 'document' ||
                req.url.endsWith('.html') || req.url.endsWith('/');
  if (esApp) {
    e.respondWith(
      fetch(req).then(resp => {
        if (resp && resp.status === 200) {
          const copy = resp.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return resp;
      }).catch(() => caches.match(req).then(c => c || caches.match('./index.html')))
    );
    return;
  }

  // Imágenes e íconos: primero caché (son fijos, abren rápido)
  e.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(resp => {
        if (resp && resp.status === 200 && req.url.startsWith(self.location.origin)) {
          const copy = resp.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return resp;
      }).catch(() => cached);
    })
  );
});
