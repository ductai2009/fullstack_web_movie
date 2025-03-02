import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../reducers';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk';
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));

const persistor = persistStore(store);

export { store, persistor };
