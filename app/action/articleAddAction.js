import { createAction } from 'redux-actions';
import { ACCESS_TOKEN, ARTICLE_URL } from '../util/data';
import { fileUpload } from './fileUploadAction';

const requestCreateArticle = createAction('REQUEST_CREATE_ARTICLE');
const responseCreateArticle = createAction('RESPONSE_CREATE_ARTICLE');

export async function addArticleData(data) {
  const { article, all_files } = data;
  console.group('addArticle Info');
  console.log(article, all_files);
  console.groupEnd();
  //  首先上传文件
  const { articleThumb, fileNameArray } = await fileUpload(all_files);

  article.articleThumb = articleThumb;
  // 假定siteId = 1;
  article.articleSiteId = 1;
  article.articleInHomepage = true;

  // 上传文章
  return fetch(`${ARTICLE_URL}`, {
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
    );
}

export function addArticle(data) {
  return async dispatch => {
    dispatch(requestCreateArticle());
    const msg = await addArticleData(data);
    dispatch(responseCreateArticle(msg));
  };
}

