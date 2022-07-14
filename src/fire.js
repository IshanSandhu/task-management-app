import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB9xr3cIkJAXjeBvXxntoWzjc-hAE2AU5I",
    authDomain: "task-matcher-53e8d.firebaseapp.com",
    projectId: "task-matcher-53e8d",
    storageBucket: "task-matcher-53e8d.appspot.com",
    messagingSenderId: "1006567663822",
    appId: "1:1006567663822:web:aed90c4b5caccb44b4889f"
  };

const fire = firebase.initializeApp(firebaseConfig);

export default fire; 
