import {createSlice} from '@reduxjs/toolkit';
import {IThemeState} from 'src/store/models/theme';
import {Appearance} from 'react-native';

const colorScheme = Appearance.getColorScheme();

interface IAction {
  payload: any;
}

const initialState: IThemeState = {
  isDark: colorScheme === 'dark',
  fontSelect: {
    title: 'Default',
    value: 'default',
  },
  themeSelect: {
    title: !colorScheme ? 'Light' : 'Use system setting',
    value: !colorScheme ? 'light' : colorScheme,
    keyWord: !colorScheme ? 'light' : 'system_setting',
  },
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: (state, action: IAction) => {
      return {
        ...state,
        themeSelect: action.payload,
        isDark: action.payload.value === 'dark',
      };
    },
    changeFontSize: (state, action) => {
      return {
        ...state,
        fontSelect: action?.payload,
      };
    },
  },
});
export const {changeTheme, changeFontSize} = themeSlice.actions;

const themeReducer = themeSlice.reducer;

export default themeReducer;
