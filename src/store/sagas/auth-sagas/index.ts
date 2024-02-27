import {takeLatest} from 'redux-saga/effects';
import * as authSaga from './auth-saga';
import {authActions} from 'src/store/slices/auth-slice';
import {REHYDRATE} from 'redux-persist';

export default function* authSagas() {
  yield takeLatest(authActions.onLoginSubmit, authSaga.onLoginSubmitSaga);
  yield takeLatest(
    authActions.onResetPasswordSubmit,
    authSaga.onResetPasswordSaga,
  );
  yield takeLatest(authActions.refreshTokenSubmit, authSaga.refreshTokenSaga);
  yield takeLatest(authActions.removeDeviceToken, authSaga.removeTokenSaga);
  yield takeLatest(
    authActions.postDeviceTokenSubmit,
    authSaga.postDeviceTokenSaga,
  );
  yield takeLatest(
    authActions.forgotPasswordSubmit,
    authSaga.forgotPasswordSaga,
  );
  yield takeLatest(
    authActions.resetPasswordWithCodeSubmit,
    authSaga.resetPasswordWithCodeSaga,
  );
  yield takeLatest(REHYDRATE, authSaga.rehydratePersist);
}
