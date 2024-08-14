import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ToastDisplay from "../components/toastDisplay";
import { onMessageListener } from "../firebase";
//import { useEffect } from "react";

// const useNotification = () => {
//   const requestNotificationPermission = async () => {
//     const permission = await Notification.requestPermission();

//     if (permission !== "granted") alert("Permisao nao concedida");
//   };

//   const sendNotification = (title, options) => {
//     if (Notification.permission === "granted") {
//       new Notification(title, options);
//     } else {
//       alert("Permissao para notificacoes nao permitida");
//     }
//   };

//   const sendTestNotification = () => {
//     const options = {
//       body: "Notificacao teste",
//       icon: "/icon-192x192.png",
//     };
//     sendNotification("Titulo teste", options);
//   };

//   useEffect(() => {
//     requestNotificationPermission();
//   }, []);

//   return { sendTestNotification };
// };

const useFirebaseNotification = () => {
  const [notification, setNotification] = useState({ title: "", body: "" });

  useEffect(() => {
    const notify = () =>
      toast(<ToastDisplay notification={notification} />, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
      });

    if (notification.title) notify();
  }, [notification]);

  useEffect(() => {
    const handleMessage = (payload) => {
      setNotification({
        title: payload?.notification?.title,
        body: payload?.notification?.body,
      });
    };

    onMessageListener()
      .then(handleMessage)
      .catch((err) => console.error(err));
  }, []);

  return {}
};

export default useFirebaseNotification;
