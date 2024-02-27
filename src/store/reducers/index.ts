import {combineReducers} from '@reduxjs/toolkit';
// Reducer Imports
import loadingReducer from 'src/store/slices/loading-slice';
import authReducer from 'src/store/slices/auth-slice';
import themeReducer from 'src/store/slices/theme-slice';
import counterReducer from 'src/store/slices/counter-slice';
import connectReducer from 'src/store/slices/connect-slice';
import appStartUpReducer from 'src/store/slices/app-startup-slice';

const rootReducer = combineReducers({
  // Reducers
  loading: loadingReducer,
  connect: connectReducer,
  auth: authReducer,
  theme: themeReducer,
  counter: counterReducer,
  appStartUp: appStartUpReducer,
});

export type RootReducerType = ReturnType<typeof rootReducer>;

export default rootReducer;
