import messaging from '@react-native-firebase/messaging';
import notifee, {
  AndroidImportance,
  AndroidLaunchActivityFlag,
  AndroidStyle,
  Notification,
} from '@notifee/react-native';
import AppStyles from 'src/config/styles';
import {PermissionsAndroid, Platform} from 'react-native';
import {TypeCategory, TypeNotificationMessage} from 'src/utils/app-const';

export default class FCMService {
  // static initPushNotifications = (onNotification: Function) => {
  //   messaging().setBackgroundMessageHandler(async remoteMessage => {
  //     console.log('Message handled in the background!', remoteMessage);
  //     onNotification(remoteMessage);
  //   });
  // };

  static getDefaultChannel = () => {
    return notifee.createChannel({
      id: 'fcm_fallback_notification_channel',
      name: 'agoraparent channel',
      description: 'A channel for your notifications',
      sound: 'default',
      importance: AndroidImportance.HIGH,
      vibration: true,
      badge: true,
    });
  };

  static displayLocalNotification = async ({title, body, data}: any) => {
    FCMService.requestUserPermission();
    // console.log('data type notification display', data);
    const channel = await FCMService.getDefaultChannel();
    const notificationConfig: Notification = {
      title: title || '',
      body: body || '',
      android: {
        channelId: channel,
        sound: 'default',
        importance: AndroidImportance.HIGH,
        smallIcon: '@drawable/ic_stat_ic_notification',
        smallIconLevel: 3,
        color: '#000000',
        colorized: true,
        // largeIcon: data?.imageUrl,
        pressAction: {
          id: 'default',
          launchActivity: 'default',
          launchActivityFlags: [AndroidLaunchActivityFlag.SINGLE_TOP],
        },
      },
      ios: {
        sound: 'default',
      },
      data: data || {},
    };
    if (
      (data?.type === TypeNotificationMessage?.UPDATES &&
        (data?.imageUrl || data?.mediaUrl)) ||
      (data?.type === TypeNotificationMessage?.CHECK_IN && data.imageUrl)
    ) {
      let imagePath = data?.imageUrl;
      if (
        data?.type === TypeNotificationMessage?.UPDATES &&
        data?.mediaCategory === TypeCategory.PHOTOS
      ) {
        imagePath = data?.mediaUrl;
      }
      notificationConfig.android.largeIcon = imagePath;
      notificationConfig.android.style = {
        type: AndroidStyle.BIGPICTURE,
        picture: imagePath,
        largeIcon: null,
      };
      notificationConfig.ios.attachments = [
        {
          // Remote image
          url: imagePath,
          thumbnailHidden: false,
        },
      ];
    }
    await notifee.displayNotification(notificationConfig);
  };

  static checkAndAskPermission = (callback: Function) => {
    messaging()
      .hasPermission()
      .then(r => {
        console.log('permission fcm', r);
        if (r) {
          callback(true);
        } else {
          callback(false);
        }
      })
      .catch(e => {
        console.log('permission fcm', e);
        callback(false);
      });
  };

  static onMessage = (callback: Function) => {
    messaging().onMessage(remoteMessage => {
      console.log('nossss', remoteMessage);
      callback?.(remoteMessage);
    });
  };

  static getFcmToken = async (callback: Function) => {
    messaging()
      .hasPermission()
      .then(authStatus => {
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          try {
            messaging()
              .getToken()
              .then(token => {
                console.log('token =>>>', token);
                if (token) {
                  callback(token);
                }
              });
          } catch (error) {
            console.log('error ----->>', error);
          }
        } else {
          FCMService.requestUserPermission().then(res => {
            if (res) {
              console.log('Permission is authorized: ', res);
              FCMService.getFcmToken(callback);
            }
          });
        }
      });
  };

  static setBadge(number: number) {
    try {
      notifee.setBadgeCount(Number(number));
    } catch (error) {}
  }

  static subscribeToTopic = (topic: any) => {
    return messaging().subscribeToTopic(topic);
  };

  static requestUserPermission = async () => {
    if (Platform.OS === 'android') {
      if (Number(Platform.Version) >= 33) {
        return PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
      } else {
        return true;
      }
    } else {
      const authStatus = await messaging().requestPermission({
        alert: true,
        sound: true,
        badge: true,
      });

      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
        return true;
      }
      return false;
    }
  };

  static onTokenRefresh = async (callback: Function) => {
    try {
      messaging().onTokenRefresh(token => {
        console.log({token});
        if (token) {
          callback(token);
        }
      });
    } catch (error) {
      console.log('error>>', error);
    }
  };

  static onNotificationOpenedApp = (callback: Function) => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('nossss open app', remoteMessage);
      callback(remoteMessage);
    });
  };

  static getInitPushNotification = (callback: Function) => {
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log('initial', remoteMessage);
        callback(remoteMessage);
      });
  };
}
