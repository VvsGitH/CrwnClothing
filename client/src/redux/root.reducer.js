import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // LOCAL STORAGE

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';
import popupReducer from './popup/popup.reducer';

// CREO IL ROOT-REDUCER
const rootReducer = combineReducers({
	user: userReducer,
	cart: cartReducer,
	directory: directoryReducer,
	shop: shopReducer,
	popup: popupReducer,
});

// REDUX-PERSIST CONFIG
// Salvo in locale solo il carrello
const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['cart'],
};

export default persistReducer(persistConfig, rootReducer);
