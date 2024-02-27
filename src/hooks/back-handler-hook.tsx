import {useEffect} from 'react';
import {Alert, BackHandler, Platform} from 'react-native';

export const useInitialBackHandler = (
  backHandleAction: () => boolean,
  isShowExistConfirm?: boolean,
) => {
  const backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want to go back?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };

  useEffect(() => {
    if (Platform.OS !== 'android') {
      return;
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      isShowExistConfirm ? backAction : backHandleAction,
    );

    return () => backHandler && backHandler.remove();
  }, [backHandleAction, isShowExistConfirm]);

  return {};
};

export default useInitialBackHandler;
