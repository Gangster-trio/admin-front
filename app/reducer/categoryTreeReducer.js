import {handleActions} from 'redux-actions';

export const categoryTreeReducer = handleActions(
  {
    REQUEST_CATEGORY_TREE: state => ({
      ...state,
      isFetching: true
    }),
    RECEIVE_CATEGORY_TREE: (state, action) => ({
      ...state,
      isFetching: false,
      data: action.payload
    })
  },
  {
    isFetching: true,
    data: {}
  }
);