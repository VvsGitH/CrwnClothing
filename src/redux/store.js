import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'; // Middleware
import { persistStore } from 'redux-persist'; // Persistor

import rootReducer from './root-reducer';

// CREO LO STORE
const middlewares = [logger];
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// REDUX-PERSIST
export const persistor = persistStore(store);
