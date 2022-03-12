// [START initialize_firebase_in_sw]
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  'messagingSenderId': '68159852275'
});

const messaging = firebase.messaging();
// navigator.serviceWorker.register('%PUBLIC_URL%/firebase-message-sw.js')
//     .then(function (registration) {
//     // Registration was successful
//     console.log('firebase-message-sw :ServiceWorker registration successful with scope: ', registration.scope);
//     messaging.useServiceWorker(registration);

// //     // If you would like to customize notifications that are received in the
// //     // background (Web app is closed or not in browser focus) then you should
// //     // implement this optional method.
// //     // [START background_handler]
// //     messaging.setBackgroundMessageHandler(function(payload) {
// //         console.log('[firebase-messaging-sw.js] Received background message ', payload);
// //         // Customize notification here
// //         const notificationTitle = payload.title;
// //         const notificationOptions = {
// //         body: payload.body
// //         };
    
// //         return self.registration.showNotification(notificationTitle,
// //             notificationOptions);
// //   });

//     }, function (err) {
//     // registration failed :(
//     console.log('firebase-message-sw: ServiceWorker registration failed: ', err);
//     });
// });

