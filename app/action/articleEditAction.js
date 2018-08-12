import {createAction} from 'redux-actions';
import {ACCESS_TOKEN, URL_ARTICLE_PRE} from '../util/data';

const requestSingleArticle = createAction('REQUEST_SINGLE_ARTICLE');
const receiveSingleArticle = createAction('RECEIVE_SINGLE_ARTICLE');
export const fetchSingleArticle = articleId => {
  return fetch(`${URL_ARTICLE_PRE}/${articleId}`, {
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
    })
  })
    .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('请求错误:' + response.status);
      }
    )
    .then(article => ({article: article}));
};

export function getSingleArticle(articleId) {
  return async dispatch => {
    dispatch(requestSingleArticle);
    try {
      const data = await fetchSingleArticle(articleId);
      dispatch(receiveSingleArticle(data));
    } catch (e) {
      console.log(e);
    }
  };
}

