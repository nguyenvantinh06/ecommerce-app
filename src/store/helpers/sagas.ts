import {put, select} from 'redux-saga/effects';
import {loadingActions} from 'src/store/slices/loading-slice';
import {getCurrentUserSelector} from 'src/store/slices/auth-slice';
import {handleErrorMessage} from './handle-error';
import {authActions} from 'src/store/slices/auth-slice';
import {ICurrentUser} from 'src/store/models/login';
import {IConnectState, getIsConnectedSelector} from '../slices/connect-slice';
import {GlobalUIManager} from 'src/global-ui';
import {RootState} from '../store';

export function* invoke(
  execution: any,
  handleError: any,
  showDialog: any,
  actionType: any,
  payload?: any,
  isShowMessageError: boolean = true,
) {
  try {
    const connect: IConnectState = yield select(
      (state: RootState) => state.connect,
    );
    const {isConnected = false} = connect || {};

    yield put(loadingActions.onFetching(actionType));

    console.log('isConnected saga', isConnected);
    if (!isConnected) {
      GlobalUIManager.view?.showLostConnectModal();
      return;
    }

    if (showDialog) {
      yield put(loadingActions.showLoading(actionType));
    }

    yield* execution();
    yield put(loadingActions.nonFetching(actionType));

    if (showDialog) {
      yield put(loadingActions.hideLoading(actionType));
    }
  } catch (error) {
    if (__DEV__) {
      console.info(`Saga Invoke Error [${actionType}]>>>>>`, {error});
    }
    // const currentUser: ICurrentUser = yield select(getCurrentUserSelector);
    yield put(loadingActions.nonFetching(actionType));

    if (showDialog) {
      yield put(loadingActions.hideLoading(actionType));
    }

    const errorMessage = handleErrorMessage(error);
    console.log('errorMessage: =======> ', errorMessage);
    // console.log('user saga', currentUser);

    if (errorMessage && errorMessage.status === 500) {
      GlobalUIManager?.view?.showErrorConstruction();
      return;
    }

    if (errorMessage && errorMessage.status === 'EXP_TOKEN') {
      //process refresh token -> auto recall api
      console.log('check refresh token');
      const actionReload = {
        type: actionType,
        payload,
      };
      yield put(authActions.refreshTokenSubmit({actionReload}));
      return;
    }

    // if refresh token is expired or not valid -> logout
    if (errorMessage.code === 401 && errorMessage.status === 'UNAUTHORIZED') {
      global.toast?.show('Token has expired. Please login again.', {
        type: 'error',
      });
      yield put(authActions?.logOut?.({}));
      return;
    }
    if (!isShowMessageError) {
      return;
    }

    if (errorMessage.code === 'ERR_NETWORK') {
      GlobalUIManager?.view?.showErrorConstruction();
      return;
    }

    if (typeof handleError === 'function') {
      yield handleError(errorMessage);
    } else {
      global.toast?.show(errorMessage?.message, {
        type: 'error',
      });
    }
  }
}
