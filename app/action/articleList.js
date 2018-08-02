import { createAction } from 'redux-actions';
import {
  ARTICLE_LIST,
  ARTICLE_LIST_HEADER
} from '../mock/article/article_list';

const requestArticleList = createAction('REQUEST_ARTICLE_LIST');
const receiveArticleList = createAction('RECEIVE_ARTICLE_LIST');

const fetchData = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        header: ARTICLE_LIST_HEADER,
        articles: ARTICLE_LIST
      });
    }, 1000);
  });

export function getArticleList () {
  return async (dispatch) => {
    dispatch(requestArticleList());
    const data = await fetchData();
    dispatch(receiveArticleList(data));
  };
}
