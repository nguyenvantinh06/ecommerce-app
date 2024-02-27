import React from 'react';
import GlobalUIManager from './global-ui-manager';
import {withTranslation} from 'react-i18next';
import {
  IActionSheetOptions,
  IErrorInternetConnectionProps,
  IPopupMonthPicker,
  IPopupUI,
  ISnackbar,
  IViewImage,
} from 'src/global-ui/type';
import {ActionSheetIOS} from 'react-native';
import PopupInputUI from 'src/global-ui/components/popup-input';
import PopupAlertUI from 'src/global-ui/components/popup-alert';
import PopupConfirmUI from 'src/global-ui/components/popup-confirm';
import {PopupType, IPopupOptions} from './type';
import SnackBarUI from './components/snackbar-ui';
import ErrorInternetConnection from 'src/global-ui/components/error-internet-connection';

import ErrorUnderConstructionUI, {
  IErrorUnderConstructionUI,
} from './components/error-under-construction';
import ViewImageUI from './components/view-image';
export interface GlobalUIState {
  isLoading: boolean;
  loadingMsg: string;
  isVisible: boolean;
}

type Props = {
  t?: any;
};

export class GlobalUIComp extends React.Component<Props, GlobalUIState> {
  actionsSheetRef = React.createRef<any>();
  popupInputRef = React.createRef<IPopupUI>();
  popupAlertRef = React.createRef<IPopupUI>();
  popupConfirmRef = React.createRef<IPopupUI>();
  attachPhotos = React.createRef<any>();
  snackbarRef = React.createRef<SnackBarUI>();
  popupMonthPickerRef = React.createRef<any>();
  errorConstructionRef = React.createRef<IErrorUnderConstructionUI>();
  lostConnectRef = React.createRef<IErrorInternetConnectionProps>();
  viewImageRef = React.createRef<ViewImageUI>();

  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: false,
      loadingMsg: '',
      isVisible: false,
    };
    GlobalUIManager.view = this;
  }

  componentDidMount = () => {};

  async showActionsSheet(
    options: IActionSheetOptions,
    callback: (buttonIndex: number) => void,
  ) {
    return new Promise<number>((resolve, reject) => {
      if (options?.isIOSMode) {
        try {
          ActionSheetIOS.showActionSheetWithOptions(
            options,
            (buttonIndex: number) => {
              callback?.(buttonIndex);

              if (buttonIndex > 0) {
                resolve(buttonIndex);
              } else {
                reject(-1);
              }
            },
          );
        } catch (error) {
          console.log('Error: ', error);
          reject(error);
          callback?.(-1);
        }
      } else {
        // do something to show action sheet custom
      }
    });
  }

  showPopup(type: PopupType, options: IPopupOptions) {
    switch (type) {
      case 'input':
        this.popupInputRef.current?.showPopup(options);
        return;
      case 'alert':
        console.log('Will show modal alert!');

        this.popupAlertRef.current?.showPopup(options);
        return;
      case 'confirm':
        this.popupConfirmRef.current?.showPopup(options);
        return;
      default:
        return;
    }
  }

  showSnackbar(options: ISnackbar) {
    this.snackbarRef.current?.show(options);
  }

  hideSnackbar() {
    this.snackbarRef.current?.hide();
  }

  showErrorConstruction() {
    this.errorConstructionRef.current?.show?.();
  }

  showLostConnectModal() {
    this.lostConnectRef.current?.open();
  }

  hideLostConnectModal() {
    this.lostConnectRef.current?.close();
  }
  showPopupMonthPicker(options: IPopupMonthPicker) {
    this.popupMonthPickerRef.current?.showPopup(options);
  }
  hidePopupMonthPicker() {
    this.popupMonthPickerRef.current?.hidePopup();
  }

  showViewImage(options: IViewImage) {
    this.viewImageRef.current?.show(options);
  }

  hideViewImage() {
    this.viewImageRef.current?.hide();
  }

  render() {
    return (
      <>
        <PopupInputUI ref={this.popupInputRef} />
        <PopupAlertUI ref={this.popupAlertRef} />
        <PopupConfirmUI ref={this.popupConfirmRef} />
        <SnackBarUI ref={this.snackbarRef} />
        <ErrorInternetConnection ref={this.lostConnectRef} />
        <ErrorUnderConstructionUI ref={this.errorConstructionRef} />
        <ViewImageUI ref={this.viewImageRef} />
      </>
    );
  }
}

export const GlobalUI = withTranslation()(GlobalUIComp);
