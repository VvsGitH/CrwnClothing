import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var config = {
	apiKey: 'AIzaSyBER1hflEKa4Jt35LLxUlz18QJqJIbi2nc',
	authDomain: 'crwn-db-react-udemy.firebaseapp.com',
	projectId: 'crwn-db-react-udemy',
	storageBucket: 'crwn-db-react-udemy.appspot.com',
	messagingSenderId: '709398368001',
	appId: '1:709398368001:web:7f5c754609ce876f9a9500',
	measurementId: 'G-SPMFVRTQ01',
};

firebase.initializeApp(config);

// Autentication
export const auth = firebase.auth();

// Google autentication
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

// Database
export const firestore = firebase.firestore();

// In case we need all library
export default firebase;
