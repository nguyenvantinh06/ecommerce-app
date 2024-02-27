import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';

import en from './translations/en';
import vi from './translations/vi';

const LANGUAGES = {
  en,
  vi,
};

const locales = RNLocalize.getLocales();
console.log(locales);
const LANGUAGE_DETECTOR: any = {
  type: 'languageDetector',
  async: true,
  detect: (callback: any) => {
    AsyncStorage.getItem('user-language', (err, language) => {
      if (err || !language) {
        if (err) {
          console.log('Error fetching Languages from async storage ', err);
        } else {
          console.log(
            'No language is set, choosing language of machine as fallback',
          );
        }
        if (Array.isArray(locales) && locales[0].languageCode === 'en') {
          callback(locales[0].languageCode);
        } else {
          callback('en');
        }
        return;
      }
      callback(language);
    });
  },
  init: () => {},
  cacheUserLanguage: (language: any) => {
    AsyncStorage.setItem('user-language', language);
    console.log('user-language', language);
  },
};

i18n
  .use(LANGUAGE_DETECTOR)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3', //fix compatibilityJSON v3 format handling
    resources: LANGUAGES,
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
    defaultNS: 'common',
  });
