self.addEventListener("install", (e) => {
  console.log("Service Worker installato");
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  console.log("Service Worker attivo");
});

self.addEventListener("fetch", (event) => {
  // per ora lasciamo pass-through
});