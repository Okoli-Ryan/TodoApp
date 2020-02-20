import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyC5bl89VItdoUcyvvucw1CaAGV20bpkGF0",
    authDomain: "siwes-todo-app.firebaseapp.com",
    databaseURL: "https://siwes-todo-app.firebaseio.com",
    projectId: "siwes-todo-app",
    storageBucket: "siwes-todo-app.appspot.com",
    messagingSenderId: "287611569587",
    appId: "1:287611569587:web:c133537eb6bc22d08a77c6",
    measurementId: "G-24SFVG78VY"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase
