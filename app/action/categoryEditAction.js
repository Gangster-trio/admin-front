import { createAction } from 'redux-actions';
import { ACCESS_TOKEN, CATEGORY_URL } from '../util/data';
import { fileUpload } from './fileUploadAction';
import { fetchSingleCategory } from './categoryGetAction';
import { fetchCategoryTree } from './categoryTree';

const requestSingleCategory = createAction('REQUEST_SINGLE_CATEGORY');
const receiveSingleCategory = createAction('RECEIVE_SINGLE_CATEGORY');
const requestUpdateCategory = createAction('REQUEST_UPDATE_CATEGORY');
const responseUpdateCategory = createAction('RECEIVE_UPDATE_CATEGORY');

export function getSingleCategory(categoryId) {
  return async dispatch => {
    dispatch(requestSingleCategory);
    try {
      const data = await fetchSingleCategory(categoryId);
      dispatch(receiveSingleCategory(data));
    } catch (e) {
      alert(e);
    }
  };
}

export async function updateCategoryData(data) {
  const { category, all_files } = data;
  //  首先上传文件
  const { thumb } = await fileUpload(all_files);
  if (thumb !== '') {
    category.categoryThumb = thumb;
  }
  //todo
  // 假定siteId = 1;
  // todo
  category.categorySiteId = 1;

  // 上传
  return fetch(`${CATEGORY_URL}`, {
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN),
    }),
    method: 'PUT',
    body: JSON.stringify(category),
  }).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('请求错误:' + response.status);
  });
}

export function updateCategory(data) {
  return async dispatch => {
    dispatch(requestUpdateCategory);
    const msg = await updateCategoryData(data);
    dispatch(responseUpdateCategory(msg));
  };
}

export function fetchUpdateCategoryInfo(categoryId) {
  return async dispatch => {
    dispatch(requestSingleCategory);
    const category = await fetchSingleCategory(categoryId);
    const parentCategory = await fetchSingleCategory(category.categoryParentId);
    const categoryTree = await fetchCategoryTree();
    dispatch(receiveSingleCategory({ category, parentCategory, categoryTree }));
  };
}
