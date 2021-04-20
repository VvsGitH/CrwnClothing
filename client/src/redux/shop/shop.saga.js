import { takeLatest, call, put } from 'redux-saga/effects';
import {
	firestore,
	convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.utils';

import ShopActionTypes from './shop.types';
import {
	fetchCollectionsSuccess,
	fetchCollectionsFailure,
} from './shop.actions';

function* fecthCollectionsAsync() {
	try {
		const collectionRef = firestore.collection('collections');

		const snapshot = yield collectionRef.get();

		// uso l'effetto call() in modo da poter fare il yield della funzione convertCollectionsSnapshotToMap().
		// Questo permette al middleware di eseguire la funzione in maniera differita senza che blocchi il resto dell'applicazione.
		const collectionsMap = yield call(
			convertCollectionsSnapshotToMap,
			snapshot
		);

		// l'effetto put() permette di fare il dispatch, sempre in maniera differita, di una azione.
		yield put(fetchCollectionsSuccess(collectionsMap));
	} catch (error) {
		yield put(fetchCollectionsFailure(error.message));
	}
}

// Questa saga si attiva quando viene fatto il dispatch della action FETCH_COLLECTIONS_START dal componente ShopPage.
// Nomenclatura: di solito le saga vengono chiamate come le azioni che ascoltano precedeute da on.
// Quando viene attivata, questa saga chiama un'altra funzione generatrice (vedi sopra ^) che si occupa dei side-effects.
function* onFetchCollectionsStart() {
	yield takeLatest(
		ShopActionTypes.FETCH_COLLECTIONS_START,
		fecthCollectionsAsync
	);
}

/* NOTA: takeEvery() fa in modo che la Saga si attivi ogni volta che viene fatto il dispatch della action nel primo argomento, anche se una saga identica è ancora in corso. 
Una alternativa è takeLast(), che, nel caso sia presente una Saga identica ancora in corso, cancella quella Saga e ne attiva una nuova. */

// E' buona pratica quello di esportare solo una funzione che raccoglie tutte le sagas contenute nel file.
// In questo caso è solo una, ma è comunque utile per rendere più comprensibile root.saga.js
export function* shopSagas() {
	yield call(onFetchCollectionsStart);
}
