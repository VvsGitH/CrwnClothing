import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'; // Middleware
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist'; // Persistor

import rootReducer from './root.reducer';

// CONFIGURO I MIDDLEWARES
const middlewares = [thunk];
//  voglio logger solo in development e non in production
if (process.env.NODE_ENV === 'development') {
	middlewares.push(logger);
}

// CREO LO STORE
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// REDUX-PERSIST
export const persistor = persistStore(store);
