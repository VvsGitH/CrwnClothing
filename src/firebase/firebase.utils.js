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

// Utility: aggiungere nuovo utente al db
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

// Utility: aggiungere al db un'intera collection con multipli documenti
export const addCollectionAndDocuments = async (
	collectionName,
	objectsToAdd
) => {
	// 1. Ottengo una reference della collection da Firestore. Se non esiste, Firestore la creerà nel momento in cui andrò ad aggiungere documenti
	const collectionRef = firestore.collection(collectionName);

	// 2. Aggiungo gli elementi alla collection. Posso aggiungere solo un documento alla volta e devo assicurarmi che tutti i documenti siano aggiunti senza errori. Per fare ciò utilizzo una batch write, che fallisce se una sola delle operazioni in batch fallisce.
	const batch = firestore.batch();
	objectsToAdd.forEach(obj => {
		// Prendo un riferimento ad un nuovo documento vuoto, in modo che Firebase generi la chiave in automatico
		const newDocRef = collectionRef.doc();
		// Scrivo l'oggetto nel documento vuoto
		batch.set(newDocRef, obj);
		// NB: con batch non posso utilizzare collectionRef.add()
	});

	// 3. Avvio la batch write!
	return await batch.commit();
};

// Utility: converte l'array di shop-collections contenuto in uno snapshot di firestore in un oggetto identico a quello contenuto in shop.data.backup
export const convertCollectionsSnapshotToMap = collectionsSnapshot => {
	// 1. Aggiungo a ciascuna shop-collection i campi id e routeName
	const transformedCollectionsArray = collectionsSnapshot.docs.map(doc => {
		const { title, items } = doc.data();
		return {
			id: doc.id,
			title,
			routeName: encodeURI(title.toLowerCase()),
			items,
		};
	});

	// 2. Trasformo l'array in un oggetto
	// accumulator parte come oggetto vuoto e, ad ogni iterazione, gli viene aggiunto un nuovo campo, corrispondente ad una shop-collection
	const collectionsMap = transformedCollectionsArray.reduce(
		(accumulator, collection) => {
			accumulator[collection.title.toLowerCase()] = collection;
			return accumulator;
		},
		{}
	);

	return collectionsMap;
};
