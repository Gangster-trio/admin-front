import { handleActions } from 'redux-actions';

export const categoryListReducer = handleActions(
  {
    REQUEST_CATEGORY_LIST: state => ({
      ...state,
      isFetching: true,
    }),
    RECEIVE_CATEGORY_LIST: (state, action) => ({
      ...state,
      isFetching: false,
      data: action.payload,
    }),
  },
  {
    isFetching: true,
    data: [],
  },
);
