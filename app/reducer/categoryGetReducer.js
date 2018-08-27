import { handleActions } from 'redux-actions';

export const categoryGetReducer = handleActions(
  {
    REQUEST_FETCH_CATEGORY: state => ({
      ...state,
      categoryIsFetching: true,
    }),
    RECEIVE_FETCH_CATEGORY: (state, action) => ({
      ...state,
      categoryIsFetching: false,
      data: action.payload,
    }),
  },
  {
    categoryIsFetching: true,
    data: {},
  },
);
