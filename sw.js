const CACHE='spatial-v4';
const ASSETS=['./','./index.html','./style.css','./app.js','./manifest.webmanifest','./assets/spatial-lake.svg','./assets/spatial-icon.svg'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('spatial-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{if(new URL(event.request.url).origin===location.origin)event.respondWith(caches.match(event.request).then(response=>response||fetch(event.request)))});

