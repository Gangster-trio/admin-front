import {createAction} from 'redux-actions';
import {ARTICLE_LIST_HEADER} from '../mock/article/article_list';
import {convertDate, convertStatus} from '../util/dataConversioin';
import {ACCESS_TOKEN, ARTICLE_URL} from '../util/data';

const requestArticleList = createAction('REQUEST_ARTICLE_LIST');
const receiveArticleList = createAction('RECEIVE_ARTICLE_LIST');

export const fetchArticlesData = (page, limit, order, orderBy) => {
  return fetch(`${ARTICLE_URL}?order=${order}&orderBy=${orderBy}&pageNumber=${page}&rowPerPage=${limit}&siteId=1`, {
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
      })
    }
  )
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return new Error(`请求错误:${response.status}`);
    })
    .then(data => {
        let articles = data.records;
        articles.forEach(article => {
          article.articleCreateTime = convertDate(article.articleCreateTime);
          article.articleUpdateTime = convertDate(article.articleUpdateTime);
          article.articleStatus = convertStatus(article.articleStatus);
        });
        console.log(articles);
        return {
          header: ARTICLE_LIST_HEADER,
          articles: articles,
          count: data.total
        };
      }
    )
    .catch(error => {
      console.log(`发生错误:${error}`);
    })
    ;
};

export function getArticleList(page, limit, order, orderBy) {
  return async dispatch => {
    dispatch(requestArticleList());
    const data = await fetchArticlesData(page, limit, order, orderBy);
    dispatch(receiveArticleList(data));
  };
}
