import {createAction} from 'redux-actions';
import {ACCESS_TOKEN, ARTICLE_URL} from '../util/data';
import {fileUpload} from './fileUploadAction';
import {fetchSingleCategory} from './categoryGetAction';
import {fetchCategoryTree} from './categoryList';

const requestSingleArticle = createAction('REQUEST_SINGLE_ARTICLE');
const receiveSingleArticle = createAction('RECEIVE_SINGLE_ARTICLE');
const requestUpdateArticle = createAction('REQUEST_UPDATE_ARTICLE');
const responseUpdateArticle = createAction('RESPONSE_UPDATE_ARTICLE');
export const fetchSingleArticle = articleId => {
  return fetch(`${ARTICLE_URL}/${articleId}`, {
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
    .then(article => (article))
    .catch(e => {
      console.error(`请求错误: ${e}`);
    });
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

export async function updateArticleData(data) {
  const {article, all_files} = data;
  console.log(article, all_files);
  //  首先上传文件
  const {articleThumb, fileNameArray} = await fileUpload(all_files);
  if (articleThumb !== '') {
    article.articleThumb = articleThumb;
  }
  // 假定siteId = 1;
  article.articleSiteId = 1;
  article.articleInHomepage = true;

  // 上传文章
  return fetch(`${ARTICLE_URL}`, {
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
    }),
    method: 'PUT',
    body: JSON.stringify(
      article
      // 'fileNames': fileNameArray
    )
  })
    .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('请求错误:' + response.status);
      }
    );
}

export function updateArticle(data) {
  return async dispatch => {
    dispatch(requestUpdateArticle);
    const msg = await updateArticleData(data);
    console.log(msg);
    dispatch(responseUpdateArticle(msg));
  };
}


export function fetchUpdateArticleInfo(articleId) {
  return async dispatch => {
    dispatch(requestSingleArticle);
    const article = await fetchSingleArticle(articleId);
    const categoryId = article.articleCategoryId;
    const category = await fetchSingleCategory(categoryId);
    const categoryTree = await fetchCategoryTree();
    dispatch(receiveSingleArticle({article, category, categoryTree}));
  };
}