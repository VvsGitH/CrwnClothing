import { CartActionTypes } from './cart.types';

export const toggleCartHiddenAction = () => ({
	type: CartActionTypes.TOGGLE_CART_HIDDEN,
});

export const addItemAction = item => ({
	type: CartActionTypes.ADD_ITEM,
	payload: item,
});
