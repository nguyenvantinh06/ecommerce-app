import {takeLatest} from 'redux-saga/effects';
import {
  startupInitSaga,
  startupGetConfigSaga,
  startupTryAuthSaga,
  startupLoadDataSaga,
  startupLoadUISaga,
} from 'src/store/sagas/app-startup-sagas/app-startup-saga';
import {appStartupActions} from 'src/store/slices/app-startup-slice';

const {
  INIT: startupInit,
  GET_CONFIG: startupGetConfig,
  TRY_AUTH: startupTryAuth,
  LOAD_DATA: startupLoadData,
  LOAD_UI: startupLoadUI,
} = appStartupActions;

export function* startupSaga() {
  yield takeLatest(startupInit, startupInitSaga);
  yield takeLatest(startupGetConfig, startupGetConfigSaga);
  yield takeLatest(startupTryAuth, startupTryAuthSaga);
  yield takeLatest(startupLoadData, startupLoadDataSaga);
  yield takeLatest(startupLoadUI, startupLoadUISaga);
}
