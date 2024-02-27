import {ColorValue, ProcessedColorValue} from 'react-native';
import {Button} from 'react-native-paper';

export interface IActionSheetOptions {
  title?: string | undefined;
  options: string[];
  cancelButtonIndex?: number | undefined;
  destructiveButtonIndex?: number | number[] | undefined | null;
  message?: string | undefined;
  anchor?: number | undefined;
  tintColor?: ColorValue | ProcessedColorValue | undefined;
  cancelButtonTintColor?: ColorValue | ProcessedColorValue | undefined;
  userInterfaceStyle?: 'light' | 'dark' | undefined;
  disabledButtonIndices?: number[] | undefined;
  isIOSMode?: boolean;
}

export type PopupType = 'input' | 'confirm' | 'alert';
export interface IPopupOptions {
  title?: string;
  message?: string;
  textCancel?: string;
  textConfirm?: string;
  onConfirm?: (content?: string) => void;
  onCancel?: (content?: string) => void;
}

export interface IGlobalUIManager {
  showActionsSheet?: (
    options: IActionSheetOptions,
    callback: (buttonIndex: number) => void,
  ) => Promise<number>;
  showPopup: (type: PopupType, options: IPopupOptions) => void;
  showSnackbar: (options: ISnackbar) => void;
  hideSnackbar: () => void;
  showLostConnectModal: () => void;
  hideLostConnectModal: () => void;
  showErrorConstruction: () => void;
  showPopupMonthPicker: (options: IPopupMonthPicker) => void;
  hidePopupMonthPicker: () => void;
  showViewImage: (options: IViewImage) => void;
  hideViewImage: () => void;
}

export interface IPopupUI {
  showPopup: (options: IPopupOptions) => void;
}

export interface ISnackbar {
  message: string;
  // TODO: feature/update-api-trip-events
  // duration show snackbar
  duration?: number;
  // actions snackbar
  action?: Omit<React.ComponentProps<typeof Button>, 'children'> & {
    label: string;
  };
}

export interface IPopupMonthPicker {
  monthSelected: string;
  onSubmit?: (month: number, year: number) => void;
}
export interface IErrorInternetConnectionProps {
  open: () => void;
  close: () => void;
}

export interface IViewImage {
  uri: string;
}
