import { createSelector } from 'reselect';

export const selectShopIsFetching = state => state.shop.isFetching;

// Estrae una singola collezione da SHOP_DATA in base al parametro url
// L'oggetto collections viene caricato da Firestore. Le sue chiavi corrispondono ai titoli delle collezioni.
// collectionUrlParam deriva invece dal campo linkUrl di src/redux/directory/sections.data.js
export const selectCollection = collectionUrlParam =>
	createSelector(
		state => state.shop.collections,
		collections =>
			collections[collectionUrlParam]
				? collections[collectionUrlParam]
				: { title: '', items: [] }
	);

// Converte l'oggetto in SHOP_DATA in un array
// con Object.keys(collections) ottienamo un array con tutte le chiavi di collections. A questo punto usiamo map per creare un array estaendo di volta in volta le collezioni corrispondenti alle chiavi in un elemento del nuovo array.
export const selectCollectionsForPreview = createSelector(
	state => state.shop.collections,
	collections => Object.keys(collections).map(key => collections[key])
);
