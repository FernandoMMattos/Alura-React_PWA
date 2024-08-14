import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCkIi2MQp0KcHwMKDIt15jwHlAI8lvpnq0",
  authDomain: "jornadamilhas.firebaseapp.com",
  projectId: "jornadamilhas",
  storageBucket: "jornadamilhas.appspot.com",
  messagingSenderId: "323011856564",
  appId: "1:323011856564:web:b987bf0719f8349c70efe1",
};

initializeApp(firebaseConfig);
const messaging = getMessaging();

export const requestToken = async () => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey:
        "BFd2_qRb8Zozng8-y47PbOhGl8y7zE7lrWU8aXwbg9xP9iyyx31suTexcf9eCQRcz-zAZtI4xy7t-WHvEIo_bp0",
    });

    if (currentToken) {
      console.log(currentToken);
    } else {
      console.log("Nenhum token recebido");
    }
  } catch (error) {
    console.error(error);
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
