importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');


const firebaseConfig = {
    apiKey: "AIzaSyCZWHC_x84NCh6firSfXp5y7EfSF0mo5dU",
    authDomain: "bookovsky-71d58.firebaseapp.com",
    databaseURL: "https://bookovsky-71d58.firebaseio.com",
    projectId: "bookovsky-71d58",
    storageBucket: "bookovsky-71d58.appspot.com",
    messagingSenderId: "139443943838",
    appId: "1:139443943838:web:12bf89195711431daffe8f"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();


messaging.setBackgroundMessageHandler((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.title;
    const notificationOptions = {
        body: payload.body,
        icon: '/icon.png'
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
    const clickedNotification = event.notification;
    clickedNotification.close();
    const promiseChain = clients
        .matchAll({
            type: 'window',
            includeUncontrolled: true
         })
        .then(windowClients => {
            let matchingClient = null;
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                if (windowClient.url === feClickAction) {
                    matchingClient = windowClient;
                    break;
                }
            }
            if (matchingClient) {
                return matchingClient.focus();
            } else {
                return clients.openWindow(feClickAction);
            }
        });
        event.waitUntil(promiseChain);
});