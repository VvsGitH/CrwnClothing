import CartActionTypes from './cart.types';

export const toggleCartHiddenAction = () => ({
	type: CartActionTypes.TOGGLE_CART_HIDDEN,
});

export const addItemAction = item => ({
	type: CartActionTypes.ADD_ITEM,
	payload: item,
});

export const removeItemAction = item => ({
	type: CartActionTypes.REMOVE_ITEM,
	payload: item,
});

export const clearItemFromCartAction = item => ({
	type: CartActionTypes.CLEAR_ITEM_FROM_CART,
	payload: item,
});

export const clearCartAction = () => ({
	type: CartActionTypes.CLEAR_CART,
});
