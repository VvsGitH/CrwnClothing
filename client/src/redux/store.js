import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist'; // Persistor
import logger from 'redux-logger'; // Middleware
import createSagaMiddleware from 'redux-saga';

import rootReducer from './root.reducer';
import rootSaga from './root.saga';

// CONFIGURO I MIDDLEWARES
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
//  voglio logger solo in development e non in production
if (process.env.NODE_ENV === 'development') {
	middlewares.push(logger);
}

// CREO LO STORE
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// RUN AND ADD THE SAGAS
sagaMiddleware.run(rootSaga);

// REDUX-PERSIST
export const persistor = persistStore(store);
