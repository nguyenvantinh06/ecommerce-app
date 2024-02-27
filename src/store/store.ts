import {Store, configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logger from 'redux-logger';

import {persistReducer, persistStore, PersistConfig} from 'redux-persist';

import rootSaga from './sagas';
import rootReducer from 'src/store/reducers';
import type {RootReducerType} from 'src/store/reducers';
import createCompressor from 'redux-persist-transform-compress';
const whitelist = ['auth', 'theme'];
const compressor = createCompressor({whitelist});
const config: PersistConfig<any> = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [compressor],
  debug: true,
  whitelist,
  // blacklist: ['loading', 'counter', 'connect', 'appStartUp'],
  timeout: 10000,
};

const persistedReducer = persistReducer(config, rootReducer);
let middlewares: any = [];
const sagaMiddleware = createSagaMiddleware();

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

middlewares.push(sagaMiddleware);

export const store: Store<RootReducerType> = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   thunk: false,
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
      serializableCheck: false,
    }).concat(...middlewares),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store, {});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
