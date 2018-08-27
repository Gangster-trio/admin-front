import { handleActions } from 'redux-actions';

export const categoryTreeReducer = handleActions(
  {
    REQUEST_CATEGORY_TREE: state => ({
      ...state,
      categoryTreeIsFetching: true,
    }),
    RECEIVE_CATEGORY_TREE: (state, action) => ({
      ...state,
      categoryTreeIsFetching: false,
      data: action.payload,
    }),
  },
  {
    categoryTreeIsFetching: true,
    data: [],
  },
);
