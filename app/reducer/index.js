import { combineReducers } from "redux";
import { articleListReducer } from "./articleListReducer";
import { articleEditReducer } from "./articleEditReducer";

export const rootReducer = combineReducers({
  articleList: articleListReducer,
  articleEdit: articleEditReducer
});