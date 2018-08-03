import { combineReducers } from 'redux';
import { articleListReducer } from './articleListReducer';

export const rootReducer = combineReducers({
  articleList: articleListReducer,
});
