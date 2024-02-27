/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';

const useDisAppear = (fn: () => void, deps: Array<any> = []) => {
  const navigation = useNavigation();
  useEffect(() => {
    return navigation.addListener('blur', fn);
  }, [...deps]);
};

export default useDisAppear;
