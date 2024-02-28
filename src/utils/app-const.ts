import {getSize} from 'src/hooks/use-resize-hoc';
import {Dimensions} from 'react-native';
import DeviceInfo from 'react-native-device-info';

const dimen = Dimensions.get('screen');
export const deviceWidth =
  dimen.width > dimen.height ? dimen.height : dimen.width;
export const deviceHeight =
  dimen.height > dimen.width ? dimen.height : dimen.width;

export enum SCENE_NAME {
  WELCOME = 'WELCOME',
  LOGIN = 'LOGIN',
  EXAMPLE_SCREEN = 'EXAMPLE_SCREEN',
  ROOT = 'ROOT',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  SIGN_UP = 'SIGN_UP',
  HOME_TAB = 'HOME_TAB',
  ACCOUNT_TAB = 'ACCOUNT_TAB',
  HELP_TAB = 'HELP_TAB',
  MESSAGE_DETAIL = 'MESSAGE_DETAIL',
  WEBVIEW_SCREEN = 'WEBVIEW_SCREEN',
  VIEW_HELP_SCREEN = 'VIEW_HELP_SCREEN',
  RESET_PASSWORD_SCREEN = 'RESET_PASSWORD_SCREEN',
  RESET_PASSWORD_CODE_SCREEN = 'RESET_PASSWORD_CODE_SCREEN',
  LIKES_TAB = 'LIKES_TAB',
  MESSAGES_TAB = 'MESSAGES_TAB',
  CART_TAB = 'CART_TAB',
}

export const LOCAL_STORAGE = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
};
export const REGEX_DATE_SHORT =
  /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{4})$/gm;

export enum EventKeys {
  RELOAD_CHECK_INS = 'RELOAD_CHECK_INS',
  SHOW_RELOAD_CHECK_INS_BUTTON = 'SHOW_RELOAD_CHECK_INS_BUTTON',
  RELOAD_UPDATES = 'RELOAD_UPDATES',
  SHOW_RELOAD_UPDATES_BUTTON = 'SHOW_RELOAD_UPDATES_BUTTON',
  RELOAD_TOGGLE = 'RELOAD_TOGGLE',
}

export const isIphoneWithDynamicIsland = DeviceInfo.hasDynamicIsland();

export enum Spacing {
  '4px' = getSize.m(4),
  '8px' = getSize.m(8),
  '12px' = getSize.m(12),
  '16px' = getSize.m(16),
  '20px' = getSize.m(20),
  '24px' = getSize.m(24),
  '28px' = getSize.m(28),
  '32px' = getSize.m(32),
  '36px' = getSize.m(36),
  '40px' = getSize.m(40),
  '44px' = getSize.m(44),
  '48px' = getSize.m(48),
  '52px' = getSize.m(52),
  '56px' = getSize.m(56),
  '60px' = getSize.m(60),
  '64px' = getSize.m(64),
  '68px' = getSize.m(68),
  '72px' = getSize.m(72),
}

export type ISpacing = keyof typeof Spacing;

export const hitSlop = {
  bottom: 16,
  left: 16,
  right: 16,
  top: 16,
};

export const hitSlopColor = {
  bottom: 4,
  left: 4,
  right: 4,
  top: 4,
};

export const DEFAULT_AVATAR =
  'https://rnproject_template-dev-resource.s3.ap-southeast-1.amazonaws.com/media/c0.png';

export enum TypeMessage {
  CHECK_IN = 'CHECK_IN',
  UPDATE = 'UPDATE',
  CHECK_IN_WITHOUT_PICTURE = 'CHECK_IN_WITHOUT_PICTURE',
}

export enum TypeCategory {
  PHOTOS = 'Photos',
  REPORTS = 'Reports',
  NEWSLETTERS = 'Newsletters',
  NOTICES = 'Notices',
}

export const TypeNotificationMessage = {
  CHECK_IN: 'check_in',
  UPDATES: 'updates',
};

export const TypeMedia = {
  RICH_TEXT: 'richtext',
};
