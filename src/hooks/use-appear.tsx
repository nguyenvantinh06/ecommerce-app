/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';

const useAppear = (fn: () => void, deps: Array<any> = []) => {
  const navigation = useNavigation();
  useEffect(() => {
    return navigation.addListener('focus', fn);
  }, [...deps]);
};

export default useAppear;
