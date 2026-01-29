var firebaseConfig = {
  apiKey: "AIzaSyCz-PhqsuJQLjjJsBQW9vCXlWrLiJ7YiPk",
  authDomain: "rizkiayuwedding-guestbook.firebaseapp.com",
  projectId: "rizkiayuwedding-guestbook",
  storageBucket: "rizkiayuwedding-guestbook.firebasestorage.app",
  messagingSenderId: "761623226932",
  appId: "1:761623226932:web:9a38cbed1d5ee56177b861"
};

firebase.initializeApp(firebaseConfig);

// WAJIB GLOBAL
window.db = firebase.firestore();

console.log("Firebase OK", window.db);
