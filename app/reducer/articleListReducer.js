import { handleActions } from 'redux-actions';

export const articleListReducer = handleActions(
  {
    REQUEST_ARTICLE_LIST: (state) => ({
      ...state,
      isFetching: true
    }),
    RECEIVE_ARTICLE_LIST: (state, action) => ({
      ...state,
      isFetching: false,
      data: action.payload
    })
  },
  {
    isFetching: true,
    data: []
  }
);
