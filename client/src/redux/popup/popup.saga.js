import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from '../user/user.types';
import { createPopup } from './popup.actions';

// ........... SAGAS ........... //

function* signInSuccessPopup({ payload: { displayName } }) {
	yield put(createPopup(true, `Welcome back ${displayName}!`));
}

function* signUpSuccessPopup({ payload: { displayName } }) {
	yield put(
		createPopup(true, `Registration completed!\nWelcome ${displayName}!`)
	);
}

function* signFailPopup({ payload: { message } }) {
	yield put(createPopup(false, message));
}

// ........... LISTENERS ........... //

function* onSignInSuccess() {
	yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, signInSuccessPopup);
}

function* onSignUpSuccess() {
	yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signUpSuccessPopup);
}

function* onSignFail() {
	yield takeLatest(
		[UserActionTypes.SIGN_IN_FAILURE, UserActionTypes.SIGN_UP_FAILURE],
		signFailPopup
	);
}

// ........... CONTAINER ........... //

export function* popupSagas() {
	yield all([call(onSignInSuccess), call(onSignFail), call(onSignUpSuccess)]);
}

/*

Una saga sembra decisamente overkill per gestire un popup, ma è l'unico modo 
per far apparire i popup corretti dopo il sign-in/up dell'utente senza 
'sporcare' le user sagas.
Per tutti gli altri componenti più semplici, il popup sarà gestito facendo
il semplice dispatch della action.

*/
