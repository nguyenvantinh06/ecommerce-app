/* eslint-disable no-bitwise */
import moment from 'moment';
import {
  EventKeys,
  REGEX_DATE_SHORT,
  SCENE_NAME,
  TypeCategory,
  TypeNotificationMessage,
} from './app-const';
import {Linking, Alert, Platform, DeviceEventEmitter} from 'react-native';
import _ from 'lodash';
import path from 'path';
// import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import NavigationService from 'src/navigation/navigations-service';
import MessageService from 'src/services/message-service';
import {GlobalUIManager} from 'src/global-ui';
// import FileViewer from 'react-native-file-viewer';
import AppStyles from 'src/config/styles';
import RNFetchBlob from 'rn-fetch-blob';

// format dateString to string or Date to string by a formatString
export function dateTimeFormat(date: any, formatString = 'DD/MM/YYYY') {
  if (!date) {
    return '';
  }

  try {
    if (typeof date === 'string') {
      if (REGEX_DATE_SHORT.test(date)) {
        REGEX_DATE_SHORT.lastIndex = 0;
        return moment(date, 'DD/MM/YYYY').utc().format(formatString);
      } else {
        return moment(date).utc().format(formatString);
      }
    } else if (date instanceof Date) {
      return moment(date).utc().format(formatString);
    } else {
      return '';
    }
  } catch (error) {
    console.log('Parser date error: ', error);
    return '';
  }
}

export function dateTimeParseShow(date: any, formatString = 'DD MMM YYYY') {
  if (!date) {
    return '';
  }

  try {
    if (typeof date === 'string') {
      if (REGEX_DATE_SHORT.test(date)) {
        REGEX_DATE_SHORT.lastIndex = 0;
        return moment(date, 'DD/MM/YYYY')?.format(formatString);
      } else {
        return moment(date)?.format(formatString);
      }
    } else if (date instanceof Date) {
      return moment(date)?.format(formatString);
    } else {
      return '';
    }
  } catch (error) {
    console.log('Parser date error: ', error);
    return '';
  }
}

export const getSubString = (
  str: string,
  first_character: string,
  last_character: string,
) => {
  const new_str = str
    ?.match(first_character + '(.*)' + last_character)?.[1]
    ?.trim();
  return new_str;
};

export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export async function openURL(url: string) {
  try {
    await Linking.openURL(url);
  } catch (error) {
    Alert.alert('Error');
  }
}

export const formatNumber = (number: number) => {
  if (!number || number === 0) {
    return '0.00';
  }
  const format2Decimals = number?.toFixed(2);
  let parserNumber = format2Decimals.split('.');
  const negative = Number(parserNumber[0]) < 0;
  let tempValue = Math.abs(Number(parserNumber[0]))
    .toString()
    .replace(/./g, (c, i, a) =>
      i > 0 && c !== ',' && (a.length - i) % 3 === 0 ? `,${c}` : c,
    );
  parserNumber[0] = tempValue;
  return negative
    ? `-${parserNumber?.join('.')?.toString()}`
    : parserNumber?.join('.')?.toString();
};

export const getExtensionFile = (fileName: string) => {
  return fileName?.substring(fileName?.lastIndexOf('.') + 1) || '';
};

export const getDifference = (array1: Array<any>, array2: Array<any>) => {
  return array1.filter(obj1 => !array2.some(obj2 => _.isEqual(obj1, obj2)));
};

export const getDifferenceByField = (
  array1: Array<any>,
  array2: Array<any>,
  fieldCompare = '_id',
) => {
  return array1.filter(obj1 => {
    // Check if the ID of obj1 exists in array2
    return !array2.some(obj2 => obj2?.[fieldCompare] === obj1?.[fieldCompare]);
  });
};

export function removeObjectWithId(arr: Array<any>, id: any) {
  const objWithIdIndex = arr.findIndex(obj => obj._id === id);
  arr.splice(objWithIdIndex, 1);
  return arr;
}

export function checkContentType(
  contentType: string,
  allowedTypes: Array<any>,
): boolean {
  if (allowedTypes.includes(contentType)) {
    return true;
  }

  // Check if the content type is a wildcard match
  for (const allowedType of allowedTypes) {
    if (
      allowedType.endsWith('/*') &&
      contentType.startsWith(allowedType.slice(0, -2))
    ) {
      return true;
    }
  }

  return false;
}

export function getNamePath(filePath: string): string {
  const fileName = path.basename(filePath);
  return fileName || 'file';
}

export function checkIsHeicFile(name: string, filePath: string): boolean {
  return (
    name?.toLowerCase()?.endsWith('heic') ||
    filePath?.toLowerCase()?.endsWith('heic')
  );
}

export const getUniqueFileName = async (filePath: string) => {
  const exists = await RNFS.exists(filePath);
  if (!exists) {
    return filePath;
  }

  const fileExt = filePath.split('.').pop();
  const fileName = filePath.replace(`.${fileExt}`, '');

  let count = 1;
  let uniqueFileName = filePath;

  uniqueFileName = `${fileName}_${count}.${fileExt}`;

  while (await RNFS.exists(uniqueFileName)) {
    uniqueFileName = `${fileName}_${count}.${fileExt}`;
    count++;
  }

  return uniqueFileName;
};

export const callNumber = (phone: string) => {
  let phoneNumber = phone;
  if (Platform.OS !== 'android') {
    phoneNumber = `telprompt:${phone}`;
  } else {
    phoneNumber = `tel:${phone}`;
  }
  Linking.canOpenURL(phoneNumber)
    .then(supported => {
      if (!supported) {
        Alert.alert('Phone number is not available');
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch(err => console.log(err));
};

export const sendMail = (email: string) => {
  const emailSend = `mailto:${email}`;
  Linking.canOpenURL(emailSend)
    .then(supported => {
      if (!supported) {
        Alert.alert('Send mail is not available');
      } else {
        return Linking.openURL(emailSend);
      }
    })
    .catch(err => console.log(err));
};

export const parseBadge = (number: number) => {
  if (Number.isInteger(number) && number > 99) {
    return '99+';
  } else {
    return number.toString();
  }
};

export const extractHostname = (url: string) => {
  let hostname;

  if (url?.indexOf('//') > -1) {
    hostname = url?.split('/')[2];
  } else {
    hostname = url?.split('/')[0];
  }

  hostname = hostname?.split(':')[0];
  hostname = hostname?.split('?')[0];

  return hostname;
};

export const transferDateMessageToString = (date: string | undefined) => {
  if (!date) {
    return '';
  }
  let now = moment(new Date());
  let dateCheck = moment(date);
  const timeDate = dateCheck?.format('hh:mma');
  if (now.isSame(dateCheck, 'day')) {
    return `today at ${timeDate}`;
  } else if (now.clone().add(-1, 'day').isSame(dateCheck, 'day')) {
    return `yesterday at ${timeDate}`;
  } else {
    return `on ${dateTimeParseShow(date, 'MMM DD YYYY [at] hh:mma')}`;
  }
};

export const getFileNameFromUrl = (url: string) => {
  const parts = url?.split('/');
  return parts[parts.length - 1];
};

export const getUrlExtension = (url: string) => {
  return url?.split(/[#?]/)[0]?.split('.')?.pop()?.trim();
};

// export const handleClickedNotification = (
//   notification: FirebaseMessagingTypes.RemoteMessage,
// ): void => {
//   if (notification && notification.data && notification.data.type) {
//     switch (notification.data.type) {
//       case TypeNotificationMessage.CHECK_IN:
//         DeviceEventEmitter.emit(EventKeys.RELOAD_CHECK_INS);
//         NavigationService.navigate(SCENE_NAME.CHECK_IN_TAB);
//         if (notification.data?.imageUrl) {
//           GlobalUIManager.view?.showViewImage({
//             uri: notification.data?.imageUrl || '',
//           });
//         }
//         break;
//       case TypeNotificationMessage.UPDATES:
//         if (
//           notification?.data?.mediaCategory === TypeCategory.PHOTOS ||
//           (!notification?.data?.imageUrl && !notification?.data?.mediaUrl)
//         ) {
//           MessageService.goToMessageDetail(notification.data);
//         } else {
//           openFilePdfNotification(
//             notification.data?.mediaUrl || '',
//             notification.data?.messageId || '',
//           );
//         }
//         setTimeout(() => {
//           DeviceEventEmitter.emit(EventKeys.RELOAD_UPDATES);
//         }, 1500);
//         break;
//       default:
//         console.log('click remote message');
//     }
//   }
// };

export const openFilePdfNotification = async (
  url: string,
  messageId: string,
) => {
  try {
    MessageService.markReadPdf(messageId);
    const localPath = await downloadFileFetchBlob(url);
    FileViewer.open(localPath || '', {
      showOpenWithDialog: true,
      showAppsSuggestions: true,
    })
      .then(() => {
        console.log('File downloaded successfully!');
      })
      .catch(error => {
        console.log('error downloaded', error);
      });
  } catch (error) {
    console.log('Error opening file:', error);
    GlobalUIManager.view?.showSnackbar({
      message:
        "Can't open file. Please download the file viewer app via the store.",
      duration: 2000,
    });
  }
};

export const getPolygonColor = (backgroundColor: string): string => {
  switch (backgroundColor) {
    case AppStyles.color.COLOR_LEAF_GREEN_100:
      return AppStyles.color.COLOR_LEAF_GREEN_60;
    case AppStyles.color.COLOR_ORANGE_100:
      return AppStyles.color.COLOR_ORANGE_60;
    case AppStyles.color.COLOR_AQUA_TEAL_100:
      return AppStyles.color.COLOR_AQUA_TEAL_60;
    case AppStyles.color.COLOR_CHROME_YELLOW:
      return AppStyles.color.COLOR_CHROME_YELLOW_60;
    case AppStyles.color.COLOR_CORAL_100:
      return AppStyles.color.COLOR_CORAL_60;
    case AppStyles.color.COLOR_GRAY_600:
      return AppStyles.color.COLOR_GRAY_300;
    case AppStyles.color.COLOR_NEUTRAL_BEIGE:
      return AppStyles.color.GRAY_100;
    default:
      return AppStyles.color.COLOR_PRIMARY_60;
  }
};

export const getColorCheckedIn = (backgroundColor: string) => {
  switch (backgroundColor) {
    case AppStyles.color.COLOR_PRIMARY_100:
    case AppStyles.color.COLOR_LEAF_GREEN_100:
    case AppStyles.color.COLOR_ORANGE_100:
    case AppStyles.color.COLOR_WARM_GREY:
      return AppStyles.color.GRAY_200;
    case AppStyles.color.COLOR_AQUA_TEAL_100:
    case AppStyles.color.COLOR_CHROME_YELLOW:
    case AppStyles.color.COLOR_CORAL_100:
    case AppStyles.color.COLOR_NEUTRAL_BEIGE:
      return AppStyles.color.GRAY_200;
    default:
      return AppStyles.color.GRAY_200;
  }
};

export async function downloadFileFetchBlob(pdfUrl: string) {
  try {
    const url = pdfUrl;
    const {
      dirs: {DocumentDir},
    } = RNFetchBlob.fs;
    // const isIOS = Platform.OS === 'ios';
    const aPath = Platform.select({ios: DocumentDir, android: DocumentDir});
    console.log('aPath', aPath);
    const filename = url.split('/').pop();
    const exactFileName = extractFileName(filename || '');
    console.log('filename', filename);
    // const fPath = isIOS
    //   ? `${aPath}/${exactFileName}`
    //   : `${aPath}/${exactFileName}`;
    const fPath = `${aPath}/${exactFileName}`;
    const response = await RNFetchBlob.config({
      fileCache: true,
      path: fPath,
      appendExt: 'pdf', // or the appropriate file extension
    }).fetch('GET', url);

    console.log('File downloaded to:', response.path());
    return response?.path();
  } catch (error) {
    console.error('Download error:', error);
  }
}

export function extractFileName(url: string) {
  const parts = url.split('?');
  const firstPart = parts[0];
  const segments = firstPart.split('/');
  const filename = segments[segments.length - 1];
  const decodedFilename = decodeURIComponent(filename);
  return decodedFilename;
}

export const convertHTMLToString = (html: string) => {
  return html.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, '');
};
