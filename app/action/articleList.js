import { createAction } from 'redux-actions';
import {
  ARTICLE_LIST,
  ARTICLE_LIST_HEADER,
  MOCK_DB_getArticle,
} from '../mock/article/article_list';

const requestArticleList = createAction('REQUEST_ARTICLE_LIST');
const receiveArticleList = createAction('RECEIVE_ARTICLE_LIST');

export const fetchArticlesData = (page, limit, order, orderBy) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        header: ARTICLE_LIST_HEADER,
        articles: MOCK_DB_getArticle(page, limit, order, orderBy),
        count: ARTICLE_LIST.length,
      });
    }, 1000);
  });

export function getArticleList(page, limit, order, orderBy) {
  return async dispatch => {
    dispatch(requestArticleList());
    const data = await fetchArticlesData(page, limit, order, orderBy);
    dispatch(receiveArticleList(data));
  };
}
