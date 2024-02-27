import {createSlice} from "@reduxjs/toolkit";

interface  IHelpContent {
  content: string
}

const initialState: IHelpContent = {
  content: ''
};

export const helpSlice = createSlice({
  name: 'help',
  initialState,
  reducers: {
    getHelp: (state, action) => {},
    logOut: (state, action) => {
      return {...initialState};
    },
  },
});

export const helpActions = helpSlice.actions;

const helpReducer = helpSlice.reducer;

export default helpReducer;
