import AsyncStorage from '@react-native-async-storage/async-storage';
type Callback = (error?: Error | null) => void;
type CallbackWithResult<T> = (error?: Error | null, result?: T | null) => void;
type MultiCallback = (errors?: readonly (Error | null)[] | null) => void;
const clear = (callback?: Callback | undefined): Promise<void> => {
  return AsyncStorage.clear(callback);
};

const set = async (
  key: string,
  value: any,
  callback?: Callback | undefined,
): Promise<boolean> => {
  try {
    if (typeof value === 'object' && value !== null) {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue, callback);
      return true;
    } else {
      await AsyncStorage.setItem(key, value, callback);
      return true;
    }
  } catch (e) {
    // saving error
    console.log('error store data', e);
    return false;
  }
};

const get = async (
  key: string,
  callback?: CallbackWithResult<string> | undefined,
): Promise<object | null> => {
  try {
    // const jsonValue = await AsyncStorage.getItem(key);
    const jsonValue = await AsyncStorage.getItem(key, callback);
    console.log('jsonValue', jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e: any) {
    // error reading value
    console.log('error get data', e);
    return null;
  }
};

const remove = (
  key: string,
  callback?: Callback | undefined,
): Promise<void> => {
  return AsyncStorage.removeItem(key, callback);
};

const multiRemove = (
  keys: string[],
  callback?: MultiCallback | undefined,
): Promise<void> => {
  return AsyncStorage.multiRemove([...keys], callback);
};

export default {
  clear,
  get,
  set,
  remove,
  multiRemove,
};
