import {combineReducers} from 'redux';
import {articleListReducer} from './articleListReducer';
import {articleEditReducer} from './articleEditReducer';
import {categoryTreeReducer} from './categoryTreeReducer';
import {fileUplaodReducer} from './fileUploadReducer';
import {articleAddReducer} from './articleAddReducer';

export const rootReducer = combineReducers({
  articleList: articleListReducer,
  articleEdit: articleEditReducer,
  categoryTreeList: categoryTreeReducer,
  fileUpload: fileUplaodReducer,
  articleAdd: articleAddReducer
});