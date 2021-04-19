import * as firebase from'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCZVoVBlZf5ZwKUAdbxTYu48KpLxyDjz-w",
    authDomain: "booksanta-25203.firebaseapp.com",
    projectId: "booksanta-25203",
    storageBucket: "booksanta-25203.appspot.com",
    messagingSenderId: "983291043190",
    appId: "1:983291043190:web:a7fdf2202504ad4685ee57"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();