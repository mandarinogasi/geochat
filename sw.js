// Service Worker BASE (senza push, stabile)

self.addEventListener('install', (event) => {
  console.log('SW installato');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('SW attivo');
  event.waitUntil(self.clients.claim());
});

// Apri app quando clicchi una notifica (se mai usata in futuro)
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(function(clientList) {
      for (let i = 0; i < clientList.length; i++) {
        let client = clientList[i];
        if (client.url && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow("/");
      }
    })
  );
});