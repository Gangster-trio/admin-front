import {handleActions} from 'redux-actions';

export const articleEditReducer = handleActions(
  {
    REQUEST_SINGLE_ARTICLE: state => ({
      ...state,
      isFetching: true
    }),
    RECEIVE_SINGLE_ARTICLE: (state, action) => ({
      ...state,
      isFetching: false,
      data: action.payload
    }),
    REQUEST_UPDATE_ARTICLE: state => ({
      ...state,
      isUpdating: true
    }),
    RESPONSE_UPDATE_ARTICLE: (state, action) => ({
      ...state,
      isUpdating: false,
      callbackMessage: action.payload
    }),
  },
  {
    isUpdating: false,
    isFetching: true,
    data: {},
    callbackMessage: {}
  }
);