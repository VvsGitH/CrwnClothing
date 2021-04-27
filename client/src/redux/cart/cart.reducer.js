import CartActionTypes from './cart.types';
import { addItemToCart, removeItemFromCart } from './cart.utils';

const INITIAL_STATE = {
	hidden: true,
	isFetching: false,
	cartItems: [],
	dbError: null,
};

const cartReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CartActionTypes.TOGGLE_CART_HIDDEN:
			return {
				...state,
				hidden: !state.hidden,
			};
		case CartActionTypes.ADD_ITEM:
			return {
				...state,
				cartItems: addItemToCart(state.cartItems, action.payload),
			};
		case CartActionTypes.REMOVE_ITEM:
			return {
				...state,
				cartItems: removeItemFromCart(state.cartItems, action.payload),
			};
		case CartActionTypes.CLEAR_ITEM:
			return {
				...state,
				cartItems: state.cartItems.filter(
					item => item.id !== action.payload.id
				),
			};
		case CartActionTypes.CLEAR_CART:
			return {
				...state,
				cartItems: [],
			};
		case CartActionTypes.FETCH_CART_START:
			return {
				...state,
				isFetching: true,
			};
		case CartActionTypes.FETCH_CART_SUCCESS:
			return {
				...state,
				isFetching: false,
				cartItems: action.payload,
				dbError: null,
			};
		case CartActionTypes.FETCH_CART_FAILURE:
			return {
				...state,
				isFetching: false,
				cartItems: [],
				dbError: action.payload,
			};
		case CartActionTypes.UPDATE_DB_CART_SUCCESS:
			return {
				...state,
				dbError: null,
			};
		case CartActionTypes.UPDATE_DB_CART_FAILURE:
			return {
				...state,
				dbError: action.payload,
			};
		default:
			return state;
	}
};

export default cartReducer;
