import {handleActions} from 'redux-actions';

export const articleAddReducer = handleActions(
  {
    REQUEST_CREATE_ARTICLE: state => ({
      ...state,
      isAdding: true
    }),
    RECEIVE_CREATE_ARTICLE: (state, action) => ({
      ...state,
      isAdding: false,
      data: action.payload
    })
  },
  {
    isAdding: false,
    data: {}
  }
);