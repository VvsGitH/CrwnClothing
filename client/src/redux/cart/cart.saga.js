import { call, takeLatest, put } from 'redux-saga/effects';
import UserActionTypes from '../user/user.types';
import { clearCartAction } from './cart.actions';

function* clearCartOnSignOut() {
	yield put(clearCartAction());
}

function* onSignOutSuccess() {
	yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* cartSagas() {
	yield call(onSignOutSuccess);
}
