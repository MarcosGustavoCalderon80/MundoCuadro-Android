const CACHE='mundo-cuadro-reborn-gamepad-edition-v1';
const CORE=[
 './','./index.html','./css/app.css','./js/state.js','./js/gamepad.js','./js/level_designs.js','./js/avatar.js','./js/pets.js','./js/game.js','./js/forge.js','./js/app.js','./manifest.webmanifest','./assets/logo.svg',
 './assets/backgrounds/background1.jpg','./assets/backgrounds/background2.jpg','./assets/backgrounds/background3.jpg','./assets/backgrounds/background4.jpg','./assets/backgrounds/background5.jpg','./assets/backgrounds/background6.jpg','./assets/backgrounds/background7.jpg','./assets/backgrounds/background8.jpg','./assets/backgrounds/background9.jpg','./assets/backgrounds/background10.jpg'
];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE&&k.startsWith('mundo-cuadro-reborn')).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return res}).catch(()=>caches.match('./index.html'))))});
