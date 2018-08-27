import { combineReducers } from 'redux';
import { articleListReducer } from './articleListReducer';
import { articleEditReducer } from './articleEditReducer';
import { categoryAddReducer } from './categoryAddReducer';
import { categoryEditReducer } from './categoryEditReducer';
import { categoryListReducer } from './categoryListReducer';
import { categoryTreeReducer } from './categoryTreeReducer';
import { fileUplaodReducer } from './fileUploadReducer';
import { articleAddReducer } from './articleAddReducer';
import { categoryGetReducer } from './categoryGetReducer';

export const rootReducer = combineReducers({
  articleList: articleListReducer,
  articleEdit: articleEditReducer,
  categoryTreeList: categoryTreeReducer,
  fileUpload: fileUplaodReducer,
  articleAdd: articleAddReducer,
  categoryAdd: categoryAddReducer,
  categoryGet: categoryGetReducer,
  categoryList: categoryListReducer,
  categoryEdit: categoryEditReducer,
});
