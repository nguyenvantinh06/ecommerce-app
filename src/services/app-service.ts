import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import logger from 'src/utils/logger';
import {AppState, AppStateStatus} from 'react-native';

class AppServiceUseCase {
  private static _instance?: AppServiceUseCase;
  private _appState: AppStateStatus | null = AppState.isAvailable
    ? AppState.currentState
    : null;
  private _netInfo: NetInfoState | null = null;
  /** the first time appear change listener connection */
  private _isFirstChecked: boolean = false;

  /** cache toast showed */
  private _toastDisconnect: string | undefined = undefined;
  private _toastReconnect: string | undefined = undefined;
  private _toastConnected: string | undefined = undefined;

  constructor() {
    NetInfo.fetch()
      .then((netInfo: NetInfoState) => {
        this._netInfo = netInfo;
      })
      .catch(error => {
        console.log('Fetch net info error: ', error);
      });
  }

  static instance(): AppServiceUseCase {
    if (!AppServiceUseCase._instance) {
      AppServiceUseCase._instance = new AppServiceUseCase();
    }
    return AppServiceUseCase._instance;
  }
  onAppStateChange(appState: AppStateStatus | null) {
    this._appState = appState;
  }
  onConnectionChange(netInfo: NetInfoState | null) {
    this._netInfo = netInfo;
  }
  setFirstChecked() {
    this._isFirstChecked = true;
  }
  showToastDisconnect() {
    if (!this._toastDisconnect) {
      this._toastDisconnect = global.toastNetworkModal?.show(
        'No internet connection!',
        {
          type: 'error',
          onClose: () => {
            logger.log('_toastDisconnect');
            this._toastDisconnect = undefined;
          },
        },
      );
    }
  }
  showToastReconnect(isConnected: boolean = false) {
    if (isConnected) {
      if (!this._toastReconnect) {
        this._toastReconnect = global.toastNetworkModal?.show(
          'Connecting to server...',
          {
            type: 'success',
            onClose: () => {
              logger.log('_toastReconnect');
              this._toastReconnect = undefined;
            },
          },
        );
      }
    } else {
      if (!this._toastConnected) {
        this._toastConnected = global.toastNetworkModal?.show(
          'Connected to server.',
          {
            type: 'success',
            onClose: () => {
              logger.log('_toastConnected');
              this._toastConnected = undefined;
            },
          },
        );
      }
    }
  }
  get isConnected(): boolean {
    return (
      this._netInfo?.isInternetReachable || this._netInfo?.isConnected || false
    );
  }
  get isFirstChecked(): boolean {
    return this._isFirstChecked;
  }
  get appState(): AppStateStatus | null {
    return this._appState;
  }
  get netInfo(): NetInfoState | null {
    return this._netInfo;
  }
}
const AppService: AppServiceUseCase = AppServiceUseCase.instance();
export default AppService;
