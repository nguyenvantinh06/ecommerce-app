import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {createSelector} from 'reselect';
import {AppState, AppStateStatus} from 'react-native';

export interface IConnectState {
  isConnected: boolean | null;
  appState: AppStateStatus | null;
}

const initialState: IConnectState = {
  isConnected: true,
  appState: AppState.isAvailable ? AppState.currentState : null,
};

export const connectSlice = createSlice({
  name: 'connect',
  initialState,
  reducers: {
    setConnected: (
      state: IConnectState,
      action: PayloadAction<boolean | null>,
    ) => {
      return {
        ...state,
        isConnected: action?.payload,
      };
    },
    setAppState: (
      state: IConnectState,
      action: PayloadAction<AppStateStatus | null>,
    ) => {
      return {
        ...state,
        appState: action?.payload,
      };
    },
  },
});

export const connectActions = connectSlice.actions;

const getIsConnectedActionSelector = (state: any) => state.connect.isConnected;

export const getIsConnectedSelector = createSelector(
  getIsConnectedActionSelector,
  actions => {
    return !!actions;
  },
);

const connectReducer = connectSlice.reducer;

export default connectReducer;
