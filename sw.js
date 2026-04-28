importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyD7cztFTFUz_zSiGeBbibzERV14KpKNhQw",
  authDomain: "geochat-51d5c.firebaseapp.com",
  projectId: "geochat-51d5c",
  messagingSenderId: "663629006541",
  appId: "1:663629006541:web:0fda395d92f15fb7c4cb84"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || "GeoChat";
  const options = {
    body: payload.notification?.body || "",
    icon: "/icon-192.png",
    badge: "/icon-192.png"
  };

  self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow("/"));
});