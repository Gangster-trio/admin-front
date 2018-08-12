import {createAction} from 'redux-actions';
import {ACCESS_TOKEN, URL_ARTICLE_PRE} from '../util/data';
import {fileUpload} from './fileUploadAction';

const requestCreateArticle = createAction('REQUEST_CREATE_ARTICLE');
const receiveCreateArticle = createAction('RECEIVE_CREATE_ARTICLE');

export async function uploadArticleData(data) {
  const {article, all_files} = data;
  console.log(article, all_files);
  //  首先上传文件
  const {articleThumb, fileNameArray} = await fileUpload(all_files);

  article.articleThumb = articleThumb;
  // 假定siteId = 1;
  article.articleSiteId = 1;
  article.articleInHomepage = true;

  // 上传文章
  return fetch(`${URL_ARTICLE_PRE}`, {
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
    }),
    method: 'POST',
    body: JSON.stringify({
      'article': article,
      'fileNames': fileNameArray
    })
  })
    .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('请求错误:' + response.status);
      }
    )
    .then(data => ({data: data}));
}

export function addArticle(data) {
  return async dispatch => {
    dispatch(requestCreateArticle());
    const msg = await uploadArticleData(data);
    dispatch(receiveCreateArticle(msg));
  };
}

