import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCfHlpdpUjP77ZbaCTwnIKNUlSSeUVKZvg",
	authDomain: "discord-clone-e587b.firebaseapp.com",
	databaseURL: "https://discord-clone-e587b.firebaseio.com",
	projectId: "discord-clone-e587b",
	storageBucket: "discord-clone-e587b.appspot.com",
	messagingSenderId: "730905073221",
	appId: "1:730905073221:web:ef43cffca1b4aec5d1752c",
	measurementId: "G-F7Z09F0GMB",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };
export default db;
