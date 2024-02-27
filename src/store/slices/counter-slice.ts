import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface ICounterState {
  countCheckIns: number;
  countUpdates: number;
}

const initialState: ICounterState = {
  countCheckIns: 0,
  countUpdates: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setCountCheckInsBadge: (
      preState: ICounterState,
      action: PayloadAction<number>,
    ) => {
      return {
        ...preState,
        countCheckIns: action.payload || 0,
      };
    },
    setCountUpdatesBadge: (
      preState: ICounterState,
      action: PayloadAction<number>,
    ) => {
      return {
        ...preState,
        countUpdates: action.payload || 0,
      };
    },
    logOut: (state, action) => {
      return {
        ...initialState,
      };
    },
  },
});

export const counterActions = counterSlice.actions;

const counterReducer = counterSlice.reducer;

export default counterReducer;
