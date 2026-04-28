const CACHE_VERSION = "geochat-v20260428-3";

self.addEventListener("install", (event) => {
  console.log("SW installato:", CACHE_VERSION);
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("SW attivo:", CACHE_VERSION);

  event.waitUntil(
    (async () => {
      await self.clients.claim();

      const clientsList = await self.clients.matchAll({
        type: "window",
        includeUncontrolled: true
      });

      for (const client of clientsList) {
        client.postMessage({
          type: "GEOCHAT_SW_UPDATED",
          version: CACHE_VERSION
        });
      }
    })()
  );
});

self.addEventListener("fetch", (event) => {
  // Niente cache aggressiva: prende sempre la versione aggiornata dal sito.
});