import {createAction} from 'redux-actions';
import {ACCESS_TOKEN, URL_CATEGORY_TREE} from '../util/data';

const requestCategoryTree = createAction('REQUEST_CATEGORY_TREE');
const receiveCategoryTree = createAction('RECEIVE_CATEGORY_TREE');

export const fetchCategoryTree = () => {
  return fetch(`${URL_CATEGORY_TREE}`,{
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
    .then(data => ({tree: data}));
};

export function getCategoryTree() {
  return async dispatch => {
    dispatch(requestCategoryTree);
    try {
      const data = await fetchCategoryTree();
      dispatch(receiveCategoryTree(data));
    } catch (e) {
      console.log(e);
    }
  };
}

