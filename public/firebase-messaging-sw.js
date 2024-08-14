importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyCkIi2MQp0KcHwMKDIt15jwHlAI8lvpnq0",
  authDomain: "jornadamilhas.firebaseapp.com",
  projectId: "jornadamilhas",
  storageBucket: "jornadamilhas.appspot.com",
  messagingSenderId: "323011856564",
  appId: "1:323011856564:web:b987bf0719f8349c70efe1",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
