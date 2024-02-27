/* eslint-disable react-hooks/exhaustive-deps */
import {useAppDispatch, useAppSelector} from 'src/store/hooks';
import {StartupStatus} from 'src/store/slices/app-startup-slice';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import _ from 'lodash';
import {appStartupActions} from 'src/store/slices/app-startup-slice';
import NetInfo, {
  NetInfoState,
  NetInfoStateType,
  NetInfoSubscription,
} from '@react-native-community/netinfo';
import {AppState, AppStateStatus, NativeEventSubscription} from 'react-native';
import {connectActions} from 'src/store/slices/connect-slice';
import AppService from 'src/services/app-service';
import {GlobalUIManager} from 'src/global-ui';

export const useStartUp = () => {
  let _unsubscribeAppState: NativeEventSubscription | null = null;
  let _unsubscribeNetInfo: NetInfoSubscription | null;
  const dispatch = useAppDispatch();
  const {status} = useAppSelector(state => state.appStartUp);
  const {
    INIT: startupInit,
    GET_CONFIG: startupGetConfig,
    TRY_AUTH: startupTryAuth,
    LOAD_DATA: startupLoadData,
    LOAD_UI: startupLoadUI,
    READY: startupReady,
  } = appStartupActions;

  const onAppStateChanged = (nextAppState: AppStateStatus) => {
    AppService.onAppStateChange(nextAppState);
    dispatch(connectActions.setAppState(nextAppState));
  };

  const checkConnect = (netInfo: NetInfoState | null) => {
    if (!netInfo) {
      return;
    }

    if (
      netInfo.type === NetInfoStateType.none ||
      netInfo.type === NetInfoStateType.unknown ||
      !(netInfo.isInternetReachable !== null
        ? netInfo.isInternetReachable && netInfo.isConnected
        : netInfo.isConnected)
    ) {
      GlobalUIManager.view?.showLostConnectModal();
      return;
    }
  };

  const onConnectionChange = (state: NetInfoState) => {
    if (!_.isEqual(AppService.netInfo, state)) {
      AppService.onConnectionChange(state);
      if (AppService.isFirstChecked) {
        // if (
        //   state.type === NetInfoStateType.none ||
        //   state.type === NetInfoStateType.unknown ||
        //   !(state.isInternetReachable !== null
        //     ? state.isInternetReachable && state.isConnected
        //     : state.isConnected)
        // )
        if (
          state.type === NetInfoStateType.none ||
          state.type === NetInfoStateType.unknown ||
          (state.isInternetReachable !== null && !state.isConnected)
        ) {
          GlobalUIManager.view?.showLostConnectModal();
          dispatch(connectActions.setConnected(false));
          AppService.showToastDisconnect();
          return;
        } else {
          if (state.isInternetReachable === null && state.isConnected) {
            AppService.showToastReconnect(false);
          } else if (
            state.isInternetReachable !== null &&
            !!state.isInternetReachable &&
            state.isConnected
          ) {
            AppService.showToastReconnect(true);
          }
          dispatch(connectActions.setConnected(true));

          return;
        }
      } else {
        AppService.setFirstChecked();
        dispatch(
          connectActions.setConnected(
            state.isInternetReachable !== null
              ? state.isInternetReachable && state.isConnected
              : state.isConnected,
          ),
        );
        checkConnect(state);
      }
    }
  };

  useEffect(() => {
    return () => {
      _unsubscribeAppState && _unsubscribeAppState.remove();
      _unsubscribeNetInfo && _unsubscribeNetInfo();
    };
  }, []);

  const hideSplash = () => {
    SplashScreen.hide();
  };

  const onAppReady = () => {
    checkConnect(AppService.netInfo);
    hideSplash();
    _unsubscribeNetInfo = NetInfo.addEventListener(onConnectionChange);
    _unsubscribeAppState = AppState.addEventListener(
      'change',
      onAppStateChanged,
    );
  };

  const handleAppStartup = () => {
    switch (status) {
      case StartupStatus.MOUNT:
        dispatch(startupInit({}));
        break;
      case StartupStatus.INIT_DONE:
        dispatch(startupGetConfig({}));
        break;
      case StartupStatus.GET_CONFIG_DONE:
        dispatch(startupTryAuth({}));
        break;
      case StartupStatus.TRY_AUTH_DONE:
        dispatch(startupLoadData({isInitial: true}));
        break;
      case StartupStatus.LOAD_DATA_DONE:
        dispatch(startupLoadUI({}));
        break;
      case StartupStatus.LOAD_UI_DONE:
        dispatch(startupReady({}));
        break;
      case StartupStatus.READY:
        onAppReady();
        break;
    }
  };

  React.useEffect(handleAppStartup, [status]);
};

export default useStartUp;
