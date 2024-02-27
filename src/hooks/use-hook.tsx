/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import {throttle, debounce} from 'lodash';
import {useRef, useEffect, useCallback} from 'react';
import {BackHandler, Platform} from 'react-native';

/**
 * useThrottle
 */
const useThrottle = (cb: any, delay: number) => {
  const options = {leading: true, trailing: false};
  const cbRef = useRef(cb);
  useEffect(() => {
    cbRef.current = cb;
  });
  return useCallback(
    throttle((...args: any) => cbRef.current(...args), delay, options),
    [delay],
  );
};

/**
 * useDebounce
 */
const useIsMounted = () => {
  const isMountedRef = useRef(true);
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  return () => isMountedRef.current;
};
const useDebounce = (cb: any, delay: number) => {
  const options = {
    leading: false,
    trailing: true,
  };
  const inputsRef = useRef(cb);
  const isMounted = useIsMounted();
  useEffect(() => {
    inputsRef.current = {cb, delay};
  });

  return useCallback(
    debounce(
      (...args: any) => {
        if (inputsRef.current.delay === delay && isMounted()) {
          inputsRef.current.cb(...args);
        }
      },
      delay,
      options,
    ),
    [delay, debounce],
  );
};

function usePrevious<T extends any>(value: T) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef<T>();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

const useSwipeBack = (callback: () => boolean, deps: Array<any> = []) => {
  const navigation = useNavigation();

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', callback);

    // if callback return true, it will prevent swipe back
    if (Platform.OS === 'ios') {
      navigation.setOptions({
        gestureEnabled: !callback?.(),
      });
    }
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', callback);
    };
  }, [...deps]);
};

export {useThrottle, useDebounce, useIsMounted, usePrevious, useSwipeBack};
