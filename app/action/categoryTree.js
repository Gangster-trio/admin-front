import { createAction } from 'redux-actions';
import { ACCESS_TOKEN, CATEGORY_TREE_URL } from '../util/data';

const requestCategoryTree = createAction('REQUEST_CATEGORY_TREE');
const receiveCategoryTree = createAction('RECEIVE_CATEGORY_TREE');

export const fetchCategoryTree = () => {
  return fetch(`${CATEGORY_TREE_URL}?siteId=1`, {
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN),
    }),
  }).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('请求错误:' + response.status);
  });
};

export function getCategoryTree() {
  return async dispatch => {
    try {
      dispatch(requestCategoryTree);
      const data = await fetchCategoryTree();
      dispatch(receiveCategoryTree(data));
    } catch (e) {
      alert(e);
    }
  };
}
