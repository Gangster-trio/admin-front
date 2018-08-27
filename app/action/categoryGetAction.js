import { createAction } from 'redux-actions';
import { ACCESS_TOKEN, CATEGORY_URL } from '../util/data';

const requestSingleCategory = createAction('REQUEST_FETCH_CATEGORY');
const receiveSingleCategory = createAction('RECEIVE_FETCH_CATEGORY');
export const fetchSingleCategory = categoryId => {
  return fetch(`${CATEGORY_URL}/${categoryId}`, {
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN),
    }),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('请求错误:' + response.status);
    })
    .then(category => category);
};

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
