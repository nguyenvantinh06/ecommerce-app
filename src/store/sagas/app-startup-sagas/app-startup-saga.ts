import {PayloadAction} from '@reduxjs/toolkit';
import {
  IActionStartupConfigPayload,
  IActionStartupInitPayload,
  IActionStartupLoadDataPayload,
  IActionStartupLoadUIPayload,
  IActionStartupTryAuthPayload,
} from 'src/store/models/startup';
import {ILoginState} from 'src/store/models/login';
import {
  InitialTab,
  appStartupActions,
} from 'src/store/slices/app-startup-slice';
import {
  authActions,
  getUserInformationSelector,
} from 'src/store/slices/auth-slice';
import {RootState, store} from 'src/store/store';
import _ from 'lodash';
import {call, put, select} from 'redux-saga/effects';
import moment from 'moment';
import AppConfig from 'src/config/app-config';
import {IConnectState, connectActions} from 'src/store/slices/connect-slice';
import {GlobalUIManager} from 'src/global-ui';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import AppService from 'src/services/app-service';
import logger from 'src/utils/logger';
import {apiClient} from 'src/services/client';
import jwt_decode from 'jwt-decode';
import {GetUserInfoResponse} from 'src/apis';
import 'react-native-url-polyfill/auto';

const {
  INIT_DONE: startupInitDone,
  GET_CONFIG_DONE: startupConfigDone,
  TRY_AUTH_DONE: startupTryAuthDone,
  LOAD_DATA_DONE: startupLoadDataDone,
  LOAD_UI_DONE: startupLoadUIDone,
} = appStartupActions;

export function* startupInitSaga(
  action: PayloadAction<IActionStartupInitPayload>,
) {
  logger.start('START UP --> INIT');
  yield call(initService);

  logger.start('START UP --> INIT --> CHECKING_NETWORK');
  try {
    const netInfo: NetInfoState = yield call(NetInfo.fetch);
    if (netInfo) {
      AppService.onConnectionChange(netInfo);
      yield put(connectActions.setConnected(netInfo.isConnected));
    } else {
      yield put(connectActions.setConnected(false));
    }
  } catch (error) {
    logger.error('Fetching network error:', error);
  }
  logger.end('START UP --> INIT --> CHECKING_NETWORK --> COMPLETED');
  logger.start('START UP --> INIT --> CHANGE TO --> INIT DONE');
  yield put(startupInitDone({}));
}

const initService = async () => {
  //   something code handle initial
};

export function* startupGetConfigSaga(
  action: PayloadAction<IActionStartupConfigPayload>,
) {
  logger.start('START UP --> GET CONFIG');
  // [optional]   handle get configuration

  logger.end('START UP --> INIT --> CHANGE TO --> CONFIG DONE');
  yield put(startupConfigDone({}));
}

export function* startupTryAuthSaga(
  action: PayloadAction<IActionStartupTryAuthPayload>,
) {
  logger.start('START UP --> TRY AUTH');

  const connect: IConnectState = yield select(
    (state: RootState) => state.connect,
  );
  const {isConnected = false} = connect || {};

  if (!isConnected) {
    GlobalUIManager.view?.showLostConnectModal();
    logger.end('START UP --> INIT --> CHANGE TO --> TRY AUTH DONE');
    yield put(startupTryAuthDone({}));
  } else {
    const tokenRefresh: string = yield call(getAccessTokenAsync);
    logger.log('tokenRefresh :', tokenRefresh);
    if (!tokenRefresh) {
      logger.warn('START UP --> TRY AUTH --> FAIL --> LOGOUT');
      if (tokenRefresh === '') {
        yield global.toast?.show('Token has expired. Please login again.', {
          type: 'error',
        });
      }
      yield put(authActions.logOut?.({}));
      yield put(startupLoadUIDone({}));
    } else {
      logger.end('START UP --> INIT --> CHANGE TO --> TRY AUTH DONE');
      yield put(startupTryAuthDone({}));
    }
  }

  logger.end('START UP --> INIT --> CHANGE TO --> TRY AUTH DONE');
  yield put(startupTryAuthDone({}));
}

const getAccessTokenAsync = async () => {
  const currentUser = store.getState().auth.currentUser;
  let expireTime = 0;
  if (!_.isEmpty(currentUser)) {
    const decodedAccessToken = jwt_decode(currentUser?.accessToken || '');
    expireTime = decodedAccessToken?.exp || 0;
  }
  if (!expireTime) {
    return currentUser?.accessToken;
  } else {
    const now = moment();
    const expire = moment.unix(expireTime);
    if (expire.diff(now, 'minutes') <= 5) {
      try {
        const resultRefreshToken = await refreshTokenApi(
          currentUser?.accessToken || '',
          currentUser?.refreshToken || '',
        );
        console.log('resultRefreshToken startup', resultRefreshToken);
        store.dispatch(authActions.refreshTokenSuccess?.(resultRefreshToken));
        return resultRefreshToken?.accessToken || '';
      } catch (error) {
        console.info('fetching refresh token error startup: ', error);
        return currentUser?.accessToken || '';
      }
    } else {
      const accessToken = currentUser?.accessToken || '';
      return accessToken;
    }
  }
};

const refreshTokenApi = async (accessToken: string, refreshToken: string) => {
  try {
    const refreshTokenSubmit = {refreshToken: refreshToken};
    const response = await fetch(`${AppConfig.API_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken || ''}`,
      },
      body: JSON.stringify(refreshTokenSubmit),
    });

    if (!response.ok) {
      throw new Error('Error refreshing token');
    }
    console.log('response refreshTokenApi startup', response);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error refreshing token startup:', error);
    throw error;
  }
};

export function* startupLoadDataSaga(
  action: PayloadAction<IActionStartupLoadDataPayload>,
) {
  logger.start('START UP --> LOAD DATA');
  const {isInitial = false, onSuccess, onFail} = action.payload;
  const {isLoggedIn}: ILoginState = yield select(
    (state: RootState) => state.auth,
  );
  // const userInformation: ILoginState = yield select(getUserInformationSelector);
  let initTab = InitialTab.HOME;
  if (isLoggedIn) {
    logger.log('START UP --> LOAD DATA --> LOGGED');
    // !TODO: - get user profile
    try {
      logger.start('Fetching get user profile');
      const result: {data: GetUserInfoResponse} = yield call(
        apiClient.parents.getProfile,
      );
      console.log('result parent profile', result);
      yield put(authActions?.getUserProfileSuccess(result?.data?.data?.info));
    } catch (error) {
      logger.error('Fetch data user profile error; ', error);
    }

    // !TODO: - post device token

    // try {
    //   logger.start('Fetching post device token');
    //   const result: {data: any} = yield call(
    //     apiClient.parents.saveDeviceToken,
    //     {
    //       tokenId: userInformation.deviceToken,
    //       userId: userInformation.currentUser?.sub,
    //     },
    //   );
    //   console.log('result post token load data', result);
    // } catch (error) {
    //   console.log('error post token', error);
    // }
  }
  if (isInitial) {
    logger.start('START UP --> INIT --> CHANGE TO --> LOAD DATA DONE');
    yield put(startupLoadDataDone({initTab}));
  }
  onSuccess && onSuccess();
}

export function* startupLoadUISaga(
  action: PayloadAction<IActionStartupLoadUIPayload>,
) {
  const {onSuccess, onFail} = action.payload;
  yield put(startupLoadUIDone({}));
  logger.end('START UP --> LOAD UI DONE --> COMPLETED');
  onSuccess && onSuccess();
}
