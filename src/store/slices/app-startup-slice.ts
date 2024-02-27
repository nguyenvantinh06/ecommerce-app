import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import _ from 'lodash';
import {
  IActionStartupInitPayload,
  IActionStartupConfigPayload,
  IActionStartupTryAuthPayload,
  IActionStartupLoadDataPayload,
  IActionStartupLoadUIPayload,
} from 'src/store/models/startup';

export enum StartupStatus {
  MOUNT = 'MOUNT',
  INIT = 'INIT',
  INIT_DONE = 'INIT_DONE',
  GET_CONFIG = 'GET_CONFIG',
  GET_CONFIG_DONE = 'GET_CONFIG_DONE',
  TRY_AUTH = 'TRY_AUTH',
  TRY_AUTH_DONE = 'TRY_AUTH_DONE',
  LOAD_DATA = 'LOAD_DATA',
  LOAD_DATA_DONE = 'LOAD_DATA_DONE',
  LOAD_UI = 'LOAD_UI',
  LOAD_UI_DONE = 'LOAD_UI_DONE',
  READY = 'READY',
  LOAD_INIT_TAB = 'LOAD_INIT_TAB',
}

export enum InitialTab {
  HOME = 'HomeTab',
}

interface IAppStartupState {
  status: StartupStatus | undefined;
  initTab: InitialTab;
}

const initialState: IAppStartupState = {
  status: undefined,
  initTab: InitialTab.HOME,
};

export const appStartupSlice = createSlice({
  name: 'appStartup',
  initialState,
  reducers: {
    [StartupStatus.MOUNT](state: IAppStartupState, action: PayloadAction<any>) {
      return {...state, status: StartupStatus.MOUNT};
    },
    [StartupStatus.INIT](
      state: IAppStartupState,
      action: PayloadAction<IActionStartupInitPayload>,
    ) {
      return {...state};
    },
    [StartupStatus.INIT_DONE](
      state: IAppStartupState,
      action: PayloadAction<any>,
    ) {
      return {...state, status: StartupStatus.INIT_DONE};
    },
    [StartupStatus.GET_CONFIG](
      state: IAppStartupState,
      action: PayloadAction<IActionStartupConfigPayload>,
    ) {
      return {...state};
    },
    [StartupStatus.GET_CONFIG_DONE](
      state: IAppStartupState,
      action: PayloadAction<any>,
    ) {
      return {
        ...state,
        status: StartupStatus.GET_CONFIG_DONE,
      };
    },
    [StartupStatus.TRY_AUTH](
      state: IAppStartupState,
      action: PayloadAction<IActionStartupTryAuthPayload>,
    ) {
      return {...state};
    },
    [StartupStatus.TRY_AUTH_DONE](
      state: IAppStartupState,
      action: PayloadAction<any>,
    ) {
      return {...state, status: StartupStatus.TRY_AUTH_DONE};
    },
    [StartupStatus.LOAD_DATA](
      state: IAppStartupState,
      action: PayloadAction<IActionStartupLoadDataPayload>,
    ) {
      return {...state};
    },
    [StartupStatus.LOAD_DATA_DONE](
      state: IAppStartupState,
      action: PayloadAction<any>,
    ) {
      return {
        ...state,
        status: StartupStatus.LOAD_DATA_DONE,
        initTab: action?.payload?.initTab || InitialTab.HOME,
      };
    },
    [StartupStatus.LOAD_UI](
      state: IAppStartupState,
      action: PayloadAction<IActionStartupLoadUIPayload>,
    ) {
      return {...state};
    },
    [StartupStatus.LOAD_UI_DONE](
      state: IAppStartupState,
      action: PayloadAction<any>,
    ) {
      return {...state, status: StartupStatus.LOAD_UI_DONE};
    },
    [StartupStatus.READY](state: IAppStartupState, action: PayloadAction<any>) {
      return {...state, status: StartupStatus.READY};
    },
    [StartupStatus.LOAD_INIT_TAB](
      state: IAppStartupState,
      action: PayloadAction<InitialTab>,
    ) {
      return {...state, initTab: action.payload};
    },
  },
});

export const appStartupActions = appStartupSlice.actions;

const appStartupReducer = appStartupSlice.reducer;

export default appStartupReducer;
