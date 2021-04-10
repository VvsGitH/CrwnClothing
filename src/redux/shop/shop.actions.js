import ShopActionTypes from './shop.types';

export const updateCollectionsAction = collectionsMap => ({
	type: ShopActionTypes.UPDATE_COLLECTIONS,
	payload: collectionsMap,
});
