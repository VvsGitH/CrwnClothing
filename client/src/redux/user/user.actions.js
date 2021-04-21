import {
	auth,
	googleProvider,
	createUserProfileDocument,
	getCurrentUser,
} from '../../firebase/firebase.utils';

import UserActionTypes from './user.types';
import { clearCartAction } from '../cart/cart.actions';

// ----- SIGN IN ----- //

const googleSignInStart = () => ({
	type: UserActionTypes.GOOGLE_SIGN_IN_START,
});

const emailSignInStart = () => ({
	type: UserActionTypes.EMAIL_SIGN_IN_START,
});

const signInSuccess = user => ({
	type: UserActionTypes.SIGN_IN_SUCCESS,
	payload: user,
});

const signInFailure = error => ({
	type: UserActionTypes.SIGN_IN_FAILURE,
	payload: error,
});

const getUserSnapshot = async (userAuth, dispatch) => {
	try {
		const userRef = await createUserProfileDocument(userAuth);
		const userSnapshot = await userRef.get();
		dispatch(
			signInSuccess({
				id: userSnapshot.id,
				...userSnapshot.data(),
			})
		);
	} catch (error) {
		dispatch(signInFailure(error));
	}
};

export const signInWithGoogleAsync = () => async dispatch => {
	dispatch(googleSignInStart());
	try {
		const { user } = await auth.signInWithPopup(googleProvider);
		await getUserSnapshot(user, dispatch);
	} catch (error) {
		dispatch(signInFailure(error));
	}
};

export const signInWithEmailAsync = ({ email, password }) => async dispatch => {
	dispatch(emailSignInStart());
	try {
		const { user } = await auth.signInWithEmailAndPassword(email, password);
		await getUserSnapshot(user, dispatch);
	} catch (error) {
		dispatch(signInFailure(error));
	}
};

// ----- SIGN UP ----- //

const signUpStart = () => ({
	type: UserActionTypes.SIGN_UP_START,
});

const signUpSuccess = user => ({
	type: UserActionTypes.SIGN_UP_SUCCESS,
	payload: user,
});

const signUpFailure = error => ({
	type: UserActionTypes.SIGN_UP_FAILURE,
	payload: error,
});

export const signUpAsync = ({
	email,
	password,
	displayName,
}) => async dispatch => {
	dispatch(signUpStart());
	try {
		const { user } = await auth.createUserWithEmailAndPassword(email, password);

		// Se tutto va bene, aggiungo il nuovo utente anche nel database. NOTA: newUser contiene solo email e UID, quindi aggiungo anche il nome
		const userRef = await createUserProfileDocument(user, {
			displayName,
		});
		const userSnapshot = await userRef.get();

		// Dopo la creazione dell'utente, Firebase esegue in automatico il signin, quindi faccio altrettanto
		dispatch(
			signUpSuccess({
				id: userSnapshot.id,
				...userSnapshot.data(),
			})
		);
	} catch (error) {
		dispatch(signUpFailure(error));
	}
};

// ----- SIGN OUT ----- //

const signOutStart = () => ({
	type: UserActionTypes.SIGN_OUT_START,
});

const signOutSuccess = () => ({
	type: UserActionTypes.SIGN_OUT_SUCCESS,
});

const signOutFailure = error => ({
	type: UserActionTypes.SIGN_OUT_FAILURE,
	payload: error,
});

export const signOutAsync = () => async dispatch => {
	dispatch(signOutStart());
	try {
		await auth.signOut();
		dispatch(signOutSuccess());

		// Rimuovo tutti gli elementi dal carrello
		dispatch(clearCartAction());
	} catch (error) {
		dispatch(signOutFailure(error));
	}
};

// ----- CHECK SESSION ----- //

export const checkUserSession = () => async dispatch => {
	dispatch({ type: UserActionTypes.CHECK_USER_SESSION });
	try {
		const userAuth = await getCurrentUser();
		if (userAuth) {
			await getUserSnapshot(userAuth, dispatch);
		}
	} catch (error) {
		dispatch(signInFailure(error));
	}
};
