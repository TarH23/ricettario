// Cambia il numero di versione quando aggiorni l'app, così il telefono scarica i file nuovi.
const VERSIONE = "ricettario-v4";
const FILE = ["./", "index.html", "manifest.webmanifest", "icona-180.png", "icona-512.png",
  "ricette/indice.json", "ricette/pane-semplice-fabio.ricetta.json",
  "ricette/pane-semi-senza-impasto.ricetta.json",
  "ricette/focaccia-in-teglia.ricetta.json"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSIONE).then(c => c.addAll(FILE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== VERSIONE).map(x => caches.delete(x))))
    .then(() => self.clients.claim()));
});
// Prima la rete (così prendi sempre gli aggiornamenti), poi la copia salvata se sei offline.
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    fetch(req).then(res => {
      if (res.ok) { const copia = res.clone(); caches.open(VERSIONE).then(c => c.put(req, copia)); }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match("index.html")))
  );
});
