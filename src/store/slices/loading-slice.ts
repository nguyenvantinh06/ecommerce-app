import {createSlice} from '@reduxjs/toolkit';
import {createSelector} from 'reselect';
import _ from 'lodash';

const initialState = {
  loadingActions: {},
  fetchingActions: {},
  cachingActions: {},
};

function addAction(actions: any, type: any) {
  return {...actions, [type]: true};
}

function removeAction(actions: any, type: string | number) {
  const action = {...actions};
  delete action[type];
  return action;
}

function addCachingAction(actions: any, type: any, payload: any) {
  return {...actions, [type]: payload};
}

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    showLoading: (state, action) => {
      return {
        ...state,
        loadingActions: addAction(state.loadingActions, action.payload),
      };
    },
    hideLoading: (state, action) => {
      return {
        ...state,
        loadingActions: removeAction(state.loadingActions, action.payload),
      };
    },
    onFetching: (state, action) => {
      return {
        ...state,
        fetchingActions: addAction(state.fetchingActions, action.payload),
      };
    },
    nonFetching: (state, action) => {
      return {
        ...state,
        fetchingActions: removeAction(state.fetchingActions, action.payload),
        cachingActions: removeAction(state.cachingActions, action.payload),
      };
    },
    onCaching: (state, action) => {
      const {type, payload} = action.payload;
      return {
        ...state,
        cachingActions: addCachingAction(state.cachingActions, type, payload),
      };
    },
  },
});

export const loadingActions = loadingSlice.actions;

const getLoadingActionsSelector = (state: any) => state.loading.loadingActions;

export const getIsLoadingSelector = createSelector(
  getLoadingActionsSelector,
  actions => {
    return !_.isEmpty(actions);
  },
);

const loadingReducer = loadingSlice.reducer;

export default loadingReducer;
