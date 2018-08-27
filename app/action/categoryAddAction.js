import { createAction } from 'redux-actions';
import { ACCESS_TOKEN, CATEGORY_URL } from '../util/data';
import { fileUpload } from './fileUploadAction';

const requestCreateCategory = createAction('REQUEST_CREATE_CATEGORY');
const responseCreateCategory = createAction('RECEIVE_CREATE_CATEGORY');

export async function addCategoryData(data) {
  const { category, all_files } = data;
  //  首先上传文件
  const { thumb } = await fileUpload(all_files);

  category.categoryThumb = thumb;
  // 假定siteId = 1;
  category.categorySiteId = 1;

  return fetch(`${CATEGORY_URL}`, {
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN),
    }),
    method: 'POST',
    body: JSON.stringify(category),
  }).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('请求错误:' + response.status);
  });
}

export function addCategory(data) {
  return async dispatch => {
    dispatch(requestCreateCategory());
    const msg = await addCategoryData(data);
    dispatch(responseCreateCategory(msg));
  };
}
