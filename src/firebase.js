import firebase from 'firebase';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAWg0Hp9F1GZgpthr_dNAi4yzYDXeA6V38",
    authDomain: "whats-app-clone-72c7d.firebaseapp.com",
    projectId: "whats-app-clone-72c7d",
    storageBucket: "whats-app-clone-72c7d.appspot.com",
    messagingSenderId: "400092445226",
    appId: "1:400092445226:web:d310038dabb77d1d9ce153",
    measurementId: "G-4VG304JG54"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  // to access firestore instance , basically getting our database
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  //for google authentication
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default db;