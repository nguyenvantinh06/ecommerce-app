import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {ILoginState} from 'src/store/models/login';

const initialState: ILoginState = {
  isLoggedIn: true,
  currentUser: undefined,
  deviceToken: undefined,
  isPostedDeviceToken: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onLoginSubmit: () => {},
    onResetPasswordSubmit: () => {},
    onLoginSuccess: (state, action) => {
      return {
        ...state,
        isLoggedIn: true,
        currentUser: action?.payload,
      };
    },
    refreshTokenSubmit: (state, action) => {
      return {
        ...state,
      };
    },
    refreshTokenSuccess: (state, action) => {
      return {
        ...state,
        isLoggedIn: true,
        currentUser: {...state.currentUser, ...action?.payload},
      };
    },
    logOut: (state, action) => {
      return {
        ...state,
        isLoggedIn: false,
        currentUser: undefined,
        isPostedDeviceToken: false,
      };
    },
    getUserProfileSubmit: (state, action) => {
      return {
        ...state,
        currentUser: {...state.currentUser, ...action?.payload},
      };
    },
    getUserProfileSuccess: (state, action) => {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          userInfo: {...state.currentUser?.userInfo, ...action?.payload},
        },
      };
    },
    setDeviceToken: (state, action) => {
      return {
        ...state,
        deviceToken: action?.payload,
      };
    },
    removeDeviceToken: () => {},
    postDeviceTokenSubmit: () => {},
    postDeviceTokenSuccess: (state, action) => {
      return {
        ...state,
        isPostedDeviceToken: true,
      };
    },
    forgotPasswordSubmit: () => {},
    resetPasswordWithCodeSubmit: () => {},
  },
});

export const authActions = authSlice.actions;

export const getCurrentUserSelector = (state: any) => state.auth.currentUser;
export const getUserInformationSelector = (state: any) => state.auth;

const authReducer = authSlice.reducer;

export default authReducer;
