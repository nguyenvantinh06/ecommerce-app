import {
  MD3DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  useTheme,
} from 'react-native-paper';
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {}

    // Addition "borderColor" property
    interface Theme {
      borderColor?: string;
    }
  }
}

export const PaperThemeDefault = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: '#4F46E5',
    background: '#ffffff',
    borderColor: 'rgba(0, 0, 0, 0.16)',
    text: '#323232',
  },
};

export const PaperThemeDark = {
  ...PaperDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    primary: '#4F46E5',
    background: '#00012C',
    borderColor: 'rgba(255, 255, 255, 0.12)',
    text: '#fff',
  },
};

export const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
};

export const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    background: '#303030',
    card: '#00012C',
    text: '#ffffff',
  },
};

export type AppTheme = typeof PaperThemeDark;

export const useAppTheme = (): AppTheme => useTheme() as AppTheme;
