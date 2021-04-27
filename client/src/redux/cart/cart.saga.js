import { call, takeLatest, put, all, select } from 'redux-saga/effects';
import { firestore } from '../../firebase/firebase.utils';

import UserActionTypes from '../user/user.types';
import { selectCurrentUser } from '../user/user.selectors';

import CartActionTypes from './cart.types';
import {
	clearCartAction,
	fetchCartFailure,
	fetchCartStart,
	fetchCartSuccess,
	updateDbCartFailure,
	updateDbCartSuccess,
} from './cart.actions';
import { selectCartItems } from './cart.selectors';

function mergeCarts(localCart, dbCart) {
	// Inizializzo il carello con gli elementi locali
	// Faccio una copia in modo che campi il riferimento in memoria
	const cartItems = localCart.slice();

	// Inserisco gli elementi presenti nel database
	// Se un elemento è presente in entrambi i carrelli, prendo quello locale
	for (let dbItem of dbCart) {
		let isPresent = false;
		for (let localItem of cartItems) {
			if (localItem.name === dbItem.name) isPresent = true;
		}
		!isPresent && cartItems.push(dbItem);
	}

	return cartItems;
}

function* fetchAndMergeCart({ payload: { id } }) {
	// Fetch start
	yield put(fetchCartStart());

	// Prendo gli elementi nel carrello locale
	let localCartItems = yield select(selectCartItems);

	try {
		// Fetch
		const cartRef = firestore.doc('carts/' + id);
		const cartSnap = yield cartRef.get();

		let dbCartItems = [];
		let shouldCreateCart = false;

		if (cartSnap.exists) {
			// Il carrello esiste nel db
			dbCartItems = cartSnap.data().cartItems;
		} else {
			// L'utente non ha un carrello nel db
			shouldCreateCart = true;
		}

		let cartItems = [];
		let shouldUpdateCart = false;

		if (localCartItems.length) {
			if (dbCartItems.length) {
				// Ci sono elementi in entrambi i carrelli
				cartItems = mergeCarts(localCartItems, dbCartItems);
				shouldUpdateCart = true;
			} else {
				// Ci sono solo elementi nel carrello locale
				cartItems = localCartItems;
				shouldUpdateCart = true;
			}
		} else {
			// Non ci sono elementi in locale
			cartItems = dbCartItems;
		}

		// Creo o aggiorno il carrello nel db
		if (shouldCreateCart) {
			yield cartRef.set({
				cartItems,
			});
		} else if (shouldUpdateCart) {
			yield cartRef.update({
				cartItems,
			});
		}

		yield put(fetchCartSuccess(cartItems));
	} catch (error) {
		yield put(fetchCartFailure(error));
	}
}

function* clearCartOnSignOut() {
	yield put(clearCartAction());
}

function* updateCartAsync() {
	// Ha senso comunicare con il db solo se l'utente è loggato
	const currentUser = yield select(selectCurrentUser);
	if (currentUser) {
		// Prendo il valore corrente del carrello e lo user id
		const localCart = yield select(selectCartItems);

		try {
			// Sovrascrivo il carrello remoto con quello locale
			const cartRef = firestore.doc('carts/' + currentUser.id);
			yield cartRef.update({
				cartItems: localCart,
			});

			yield put(updateDbCartSuccess());
		} catch (error) {
			yield put(updateDbCartFailure(error));
		}
	}
}

function* onSignInSuccess() {
	yield takeLatest(
		[UserActionTypes.SIGN_IN_SUCCESS, UserActionTypes.SIGN_UP_SUCCESS],
		fetchAndMergeCart
	);
}

function* onSignOutSuccess() {
	yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

function* onCartUpdate() {
	yield takeLatest(
		[
			CartActionTypes.ADD_ITEM,
			CartActionTypes.CLEAR_ITEM,
			CartActionTypes.REMOVE_ITEM,
		],
		updateCartAsync
	);
}

export function* cartSagas() {
	yield all([
		call(onSignOutSuccess),
		call(onSignInSuccess),
		call(onCartUpdate),
	]);
}
