import {navigationRef} from 'src/navigation/navigations-service';
import {useEffect, useState} from 'react';
import {BackHandler, Platform, ToastAndroid} from 'react-native';

const useBackHandler = () => {
  const [backAndroid, setBackAndroid] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (backAndroid) {
        setBackAndroid(false);
      }
    }, 1000);

    const backAction = () => {
      if (
        navigationRef.current?.getState().index === 0 &&
        Platform.OS === 'android'
      ) {
        if (backAndroid) {
          BackHandler.exitApp();
          return true;
        }
        ToastAndroid.showWithGravity(
          'Press back again to exit',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
        setBackAndroid(true);
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      clearTimeout(timer);
      backHandler.remove();
    };
  }, [backAndroid]);
};

export default useBackHandler;
