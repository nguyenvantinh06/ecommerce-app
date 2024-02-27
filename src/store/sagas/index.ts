import {fork, all} from 'redux-saga/effects';

//login
import authSagas from './auth-sagas';

import {startupSaga} from './app-startup-sagas';

export default function* rootSaga() {
  yield all([fork(authSagas)]);
  yield all([fork(startupSaga)]);
}
