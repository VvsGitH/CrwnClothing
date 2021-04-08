import { createSelector } from 'reselect';

// Estrae una singola collezione da SHOP_DATA in base al parametro url
export const selectCollection = collectionUrlParam =>
	createSelector(
		state => state.shop.collections,
		collections => collections[collectionUrlParam]
	);

// Converte l'oggetto in SHOP_DATA in un array
// con Object.keys(collections) ottienamo un array con tutte le chiavi di collections. A questo punto usiamo map per creare un array estaendo di volta in volta le collezioni corrispondenti alle chiavi in un elemento del nuovo array.
export const selectCollectionsForPreview = createSelector(
	state => state.shop.collections,
	collections => Object.keys(collections).map(key => collections[key])
);
