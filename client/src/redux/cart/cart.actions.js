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

export const clearItemAction = item => ({
	type: CartActionTypes.CLEAR_ITEM,
	payload: item,
});

export const clearCartAction = () => ({
	type: CartActionTypes.CLEAR_CART,
});

export const fetchCartStart = () => ({
	type: CartActionTypes.FETCH_CART_START,
});

export const fetchCartSuccess = cartItems => ({
	type: CartActionTypes.FETCH_CART_SUCCESS,
	payload: cartItems,
});

export const fetchCartFailure = errorMsg => ({
	type: CartActionTypes.FETCH_CART_FAILURE,
	payload: errorMsg,
});

export const updateDbCartSuccess = () => ({
	type: CartActionTypes.UPDATE_DB_CART_SUCCESS,
});

export const updateDbCartFailure = errorMsg => ({
	type: CartActionTypes.UPDATE_DB_CART_FAILURE,
	payload: errorMsg,
});
