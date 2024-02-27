import {call, select, put} from 'redux-saga/effects';
import axios from 'axios';
import Config from 'react-native-config';
// import qs from 'qs';

import {invoke} from 'src/store/helpers/sagas';
import {
  getCurrentUserSelector,
  getUserInformationSelector,
} from 'src/store/slices/auth-slice';
import {authActions} from 'src/store/slices/auth-slice';
import {apiClient} from 'src/services/client';
import {appStartupActions} from 'src/store/slices/app-startup-slice';
import {loadingActions} from 'src/store/slices/loading-slice';
import {ICurrentUser, ILoginState} from 'src/models/login';
import {counterActions} from 'src/store/slices/counter-slice';

export function* refreshTokenSaga({payload, type}: any) {
  console.log('payload refreshAccessTokenSaga ', payload);
  const {
    showLoading = false,
    callback = () => {},
    actionReload,
  } = payload || {};
  yield put(loadingActions.onCaching({payload, type}));

  yield invoke(
    function* execution() {
      const currentUser: ICurrentUser = yield select(getCurrentUserSelector);
      const resultRefreshToken: {data: ICurrentUser} = yield call(
        apiClient.auth.postRefreshToken,
        {
          refreshToken: currentUser.refreshToken,
        },
      );
      console.log('resultRefreshToken', resultRefreshToken);
      if (resultRefreshToken?.data?.accessToken) {
        yield put(authActions.refreshTokenSuccess?.(resultRefreshToken?.data));
        console.log('check check');
        yield put(actionReload);
      }
    },
    () => {},
    showLoading,
    type,
    false,
  );
}

export function* onLoginSubmitSaga({payload, type}: any) {
  const {showLoading = true, callback = () => {}, payLoadLogin} = payload || {};
  console.log('payLoadLogin', payLoadLogin);
  yield put(loadingActions.onCaching({payload, type}));
  yield invoke(
    function* execution() {
      try {
        const result: {data: any} = yield call(apiClient.auth.login, {
          ...payLoadLogin,
        });
        console.log('result login', result);
        yield put(authActions.onLoginSuccess(result?.data));
        // console.log('result profile', result?.data);
      } catch (error) {
        console.log('error login', error);
        // yield put(authActions.onLoginResponse?.());
        yield callback(error?.response);
      }
    },
    null,
    showLoading,
    type,
    payload,
  );
}

export function* onResetPasswordSaga({payload, type}: any) {
  const {
    showLoading = true,
    callback = () => {},
    payLoadResetPassword,
  } = payload || {};
  console.log('payLoadResetPassword', payLoadResetPassword);
  yield put(loadingActions.onCaching({payload, type}));
  yield invoke(
    function* execution() {
      try {
        const result: boolean = yield call(apiClient.auth.passwordChallenge, {
          ...payLoadResetPassword,
        });
        console.log('result password challenge', result);
        yield callback(result);
      } catch (error: any) {
        console.log('error login', error);
        yield callback(error?.message);
      }
    },
    null,
    showLoading,
    type,
    payload,
  );
}

export function* removeTokenSaga({payload, type}: any) {
  const {showLoading = true, callback = () => {}} = payload || {};
  yield put(loadingActions.onCaching({payload, type}));
  yield invoke(
    function* execution() {
      const userInformation: ILoginState = yield select(
        getUserInformationSelector,
      );
      try {
        const result: {data: any} = yield call(
          apiClient.parents.removeDeviceToken,
          userInformation.deviceToken || '',
        );
        console.log('result remove token', result);
        yield put(counterActions.logOut({}));
      } catch (error) {
        console.log('error login', error);
        yield put(counterActions.logOut({}));
      }
    },
    null,
    showLoading,
    type,
    payload,
  );
}

export function* postDeviceTokenSaga({payload, type}: any) {
  const {showLoading = true, callback = () => {}} = payload || {};
  yield put(loadingActions.onCaching({payload, type}));
  yield invoke(
    function* execution() {
      const userInformation: ILoginState = yield select(
        getUserInformationSelector,
      );
      try {
        const result: {data: any} = yield call(
          apiClient.parents.saveDeviceToken,
          {
            tokenId: userInformation.deviceToken,
          },
        );
        yield put(authActions.postDeviceTokenSuccess({}));
        console.log('result post token', result);
      } catch (error) {
        console.log('error post device token', error);
      }
    },
    null,
    showLoading,
    type,
    payload,
  );
}

export function* forgotPasswordSaga({payload, type}: any) {
  const {showLoading = true, callback = () => {}, formData} = payload || {};
  yield put(loadingActions.onCaching({payload, type}));
  yield invoke(
    function* execution() {
      try {
        const requestBody = {
          email: formData.email,
        };
        console.log('requestBody forgot password', requestBody);
        const result: {data: any} = yield call(apiClient.auth.passwordReset, {
          ...requestBody,
        });
        console.log('result forgot password', result);
        yield callback(result);
      } catch (error: any) {
        console.log('error post forgot password', error);
        yield callback(error?.response);
      }
    },
    null,
    showLoading,
    type,
    payload,
  );
}

export function* resetPasswordWithCodeSaga({payload, type}: any) {
  const {
    showLoading = true,
    callback = () => {},
    payLoadResetPassword,
  } = payload || {};
  console.log('payLoadResetPassword with code', payLoadResetPassword);
  yield put(loadingActions.onCaching({payload, type}));
  yield invoke(
    function* execution() {
      try {
        const result: boolean = yield call(apiClient.auth.confirmPassword, {
          ...payLoadResetPassword,
        });
        // const result = {
        //   status: 200,
        //   data: '',
        // };
        console.log('result password with code', result);
        yield callback(result);
      } catch (error: any) {
        console.log('error login', error);
        yield callback(error?.response);
      }
    },
    null,
    showLoading,
    type,
    payload,
  );
}

export function* rehydratePersist({payload, type}: any) {
  console.log(`type: ${type}, payload: `, payload);
  const {MOUNT: startupStateMount} = appStartupActions;
  // yield put(authActions.changeStatusLoad('NONE'));
  yield put(startupStateMount({}));
}
