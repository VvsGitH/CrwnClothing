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

export const createUserProfileDocument = async (userAuth, additionalData) => {
	// Se l'utente non riesce ad autenticarsi con Google
	if (!userAuth) return;

	// Se riesce a fare log-in, invio una query al database
	const userRef = firestore.doc('users/' + userAuth.uid);
	const snapShot = await userRef.get();

	// Se l'utente non esiste sul db, creo una nuova entry
	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createAt = new Date();
		try {
			await userRef.set({
				displayName,
				email,
				createAt,
				...additionalData,
			});
		} catch (error) {
			console.log('error creating user', error.message);
		}
	}

	return userRef;
};

// In case we need all library
export default firebase;
