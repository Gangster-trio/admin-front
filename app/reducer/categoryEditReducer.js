import { handleActions } from 'redux-actions';

export const categoryEditReducer = handleActions(
  {
    REQUEST_SINGLE_CATEGORY: state => ({
      ...state,
      isFetching: true,
    }),
    RECEIVE_SINGLE_CATEGORY: (state, action) => ({
      ...state,
      isFetching: false,
      data: action.payload,
    }),
    REQUEST_UPDATE_CATEGORY: state => ({
      ...state,
      isUpdating: true,
    }),
    RECEIVE_UPDATE_CATEGORY: (state, action) => ({
      ...state,
      isUpdating: false,
      callbackMessage: action.payload,
    }),
  },
  {
    isUpdating: false,
    isFetching: true,
    data: {},
    callbackMessage: {},
  },
);
