import { handleActions } from 'redux-actions';

export const fileUplaodReducer = handleActions(
  {
    REQUEST_FILE_UPLOAD: state => ({
      ...state,
      isUpload: true,
    }),
    RESPONSE_FILE_UPLOAD: (state, action) => ({
      ...state,
      isUpload: false,
      data: action.payload,
    }),
  },
  {
    isUpload: false,
    data: {},
  },
);
