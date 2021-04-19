import { takeLatest, put, all, call } from 'redux-saga/effects';
import {
	auth,
	googleProvider,
	createUserProfileDocument,
	getCurrentUser,
} from '../../firebase/firebase.utils';

import UserActionTypes from './user.types';
import {
	signInSuccess,
	signInFailure,
	signOutSuccess,
	signOutFailure,
	signUpSuccess,
	signUpFailure,
} from './user.actions';

// Verifica che l'utente sia nel db e lo aggiunge se necessario
// Fa il dispatch delle action per aggiornare lo stato user con i dati o con un errore
function* getUserSnapshot(userAuth) {
	try {
		const userRef = yield call(createUserProfileDocument, userAuth);
		const userSnapshot = yield userRef.get();
		yield put(
			signInSuccess({
				id: userSnapshot.id,
				...userSnapshot.data(),
			})
		);
	} catch (error) {
		yield put(signInFailure(error));
	}
}

// Procedura di login con account google
function* signInWithGoogle() {
	try {
		const { user } = yield auth.signInWithPopup(googleProvider);
		yield getUserSnapshot(user);
	} catch (error) {
		yield put(signInFailure(error));
	}
}

// Procedura di login con email e password
function* signInWithEmail({ payload: { email, password } }) {
	try {
		const { user } = yield auth.signInWithEmailAndPassword(email, password);
		yield getUserSnapshot(user);
	} catch (error) {
		yield put(signInFailure(error));
	}
}

// Invia una richiesta ad auth per verificare se una sessione utente è attiva o meno.
// In caso positivo, aggiorna lo stato user
function* isUserAuthenticated() {
	try {
		const userAuth = yield getCurrentUser();
		if (userAuth) {
			yield getUserSnapshot(userAuth);
		}
	} catch (error) {
		yield put(signInFailure(error));
	}
}

// Procedura di signout
function* signOut() {
	try {
		yield auth.signOut();
		yield put(signOutSuccess());
	} catch (error) {
		yield put(signOutFailure(error));
	}
}

// Procedura di registrazione di un nuovo utente
function* signUp({ payload: { email, password, displayName } }) {
	try {
		const { user } = yield auth.createUserWithEmailAndPassword(email, password);

		// Se tutto va bene, aggiungo il nuovo utente anche nel database. NOTA: newUser contiene solo email e UID, quindi aggiungo anche il nome
		const userRef = yield call(createUserProfileDocument, user, {
			displayName,
		});
		const userSnapshot = yield userRef.get();

		// Dopo la creazione dell'utente, Firebase esegue in automatico il signin, quindi faccio altrettanto
		yield put(
			signUpSuccess({
				id: userSnapshot.id,
				...userSnapshot.data(),
			})
		);
	} catch (error) {
		yield put(signUpFailure(error));
	}
}

// ------ LISTENERS ------
function* onGoogleSignInStart() {
	yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

function* onEmailSigniInStart() {
	yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

function* onCheckUserSession() {
	yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

function* onSignOutStart() {
	yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

function* onSignUpStart() {
	yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

// Combino tutti le sagas per un export/import più pulito
export function* userSagas() {
	yield all([
		call(onGoogleSignInStart),
		call(onEmailSigniInStart),
		call(onCheckUserSession),
		call(onSignOutStart),
		call(onSignUpStart),
	]);
}
