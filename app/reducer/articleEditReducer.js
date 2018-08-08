import { handleActions } from "redux-actions";

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
    })
  },
  {
    isFetching: true
  }
);