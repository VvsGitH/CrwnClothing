const CartActionTypes = {
	TOGGLE_CART_HIDDEN: 'TOGGLE_CART_HIDDEN',

	ADD_ITEM: 'ADD_ITEM',
	REMOVE_ITEM: 'REMOVE_ITEM',
	CLEAR_ITEM: 'CLEAR_ITEM',
	CLEAR_CART: 'CLEAR_CART',

	FETCH_CART_START: 'FETCH_CART_START',
	FETCH_CART_SUCCESS: 'FETCH_CART_SUCCESS',
	FETCH_CART_FAILURE: 'FETCH_CART_FAILURE',

	UPDATE_DB_CART_SUCCESS: 'UPDATE_DB_CART_SUCCESS',
	UPDATE_DB_CART_FAILURE: 'UPDATE_DB_CART_FAILURE',
};

export default CartActionTypes;
