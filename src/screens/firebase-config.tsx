import {DeviceEventEmitter, Platform} from 'react-native';
import React from 'react';
import FCMService from 'src/services/fcm-service';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import storage from 'src/utils/storage';
import messaging from '@react-native-firebase/messaging';
import {useAppDispatch} from 'src/store/hooks';
import {authActions} from 'src/store/slices/auth-slice';
import MessageService from 'src/services/message-service';
import {EventKeys, TypeNotificationMessage} from 'src/utils/app-const';
import {handleClickedNotification} from 'src/utils/app-utils';

const FirebaseConfig = () => {
  const [loading, setLoading] = React.useState(true);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    _firebaseConfig();
    bootstrap()
      .then(() => setLoading(false))
      .catch(error => {
        console.log('error firebase', error);
      });
    return notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log(
            'User dismissed notification foreground',
            detail?.notification,
          );
          break;
        case EventType.PRESS:
          console.log(
            'User pressed notification foreground',
            detail?.notification,
          );
          handleClickedNotification(detail?.notification);
          break;
      }
    });
  }, []);

  // notifee.onBackgroundEvent(async ({type, detail}) => {
  //   const {notification, pressAction} = detail;
  //   console.log('Message handled in the background notifee!', detail);
  //   // // Check if the user pressed the "Mark as read" action
  //   // if (type === EventType.ACTION_PRESS) {
  //   //   console.log('User pressed notification background', detail?.notification);
  //   //   const noficicationId: string = notification?.id ? notification?.id : '';
  //   //   // Remove the notification
  //   //   await notifee.cancelNotification(noficicationId);
  //   // }
  //   switch (type) {
  //     case EventType.DISMISSED:
  //       console.log('click click dismiss');
  //       const notificationId: string = notification?.id ? notification?.id : '';
  //       notifee.cancelNotification(notificationId);
  //       break;
  //     case EventType.PRESS:
  //       console.log('click click press');
  //       handleClickedNotification(notification);
  //       break;
  //     default:
  //       break;
  //   }
  // });

  const _firebaseConfig = async () => {
    if (
      Platform.OS === 'ios' &&
      !messaging().isDeviceRegisteredForRemoteMessages
    ) {
      const isRegister = await messaging().registerDeviceForRemoteMessages();
      console.log('isRegister', isRegister);
    }

    const res = await FCMService.requestUserPermission();

    if (!res && Platform.OS === 'ios') {
      return;
    }

    FCMService.getFcmToken((token: any) => {
      console.log('getFcmToken: ', token);
      //   Global.saveDeviceToken(token);
      storage.set('deviceToken', token);
      dispatch?.(authActions.setDeviceToken(token));
    });

    FCMService.onTokenRefresh(async (token: any) => {
      console.log('onTokenRefresh: ', token);
      const deviceToken = await storage.get('deviceToken');
      if (!deviceToken) {
        // Global.saveDeviceToken(token);
        storage.set('deviceToken', token);
        dispatch?.(authActions.setDeviceToken(token));
      }
    });

    FCMService.onNotificationOpenedApp((notification: any) => {
      console.log('notification open app', notification);
      handleClickedNotification(notification);
    });

    FCMService.getInitPushNotification((notification: any) => {
      console.log('notification open kill app', notification);
      handleClickedNotification(notification);
    });

    // open-app
    FCMService.onMessage((item: FirebaseMessagingTypes.RemoteMessage) => {
      console.log('notify onMessage', item);
      if (item?.data?.type === TypeNotificationMessage.CHECK_IN) {
        DeviceEventEmitter.emit(EventKeys.SHOW_RELOAD_CHECK_INS_BUTTON);
      } else if (item?.data?.type === TypeNotificationMessage.UPDATES) {
        MessageService.countUnreadMessage();
        DeviceEventEmitter.emit(EventKeys.SHOW_RELOAD_UPDATES_BUTTON);
      }
      try {
        const {notification, data} = item;
        const dataNotification = {
          title: notification?.title,
          body: notification?.body,
          data,
        };

        FCMService.displayLocalNotification(dataNotification);
      } catch (error) {
        console.log('error fcm service on message', error);
      }
    });
  };

  // Bootstrap sequence function
  async function bootstrap() {
    const initialNotification = await notifee.getInitialNotification();

    if (initialNotification) {
      console.log(
        'Notification caused application to open',
        initialNotification.notification,
      );
      console.log(
        'Press action used to open the app',
        initialNotification.pressAction,
      );
      handleClickedNotification(initialNotification.notification);
    }
  }
  return <></>;
};

export default FirebaseConfig;
