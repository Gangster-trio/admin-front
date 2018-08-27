import { handleActions } from 'redux-actions';

export const categoryAddReducer = handleActions(
  {
    REQUEST_CREATE_CATEGORY: state => ({
      ...state,
      isAdding: true,
    }),
    RECEIVE_CREATE_CATEGORY: (state, action) => ({
      ...state,
      isAdding: false,
      data: action.payload,
    }),
  },
  {
    isAdding: false,
    data: {},
  },
);
