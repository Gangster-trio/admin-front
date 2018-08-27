import { createAction } from 'redux-actions';
import { CATEGORY_LIST_HEADER } from '../data/category/CategoryHeader';
import { convertDate, convertStatus } from '../util/dataConvert';
import { ACCESS_TOKEN, CATEGORY_URL } from '../util/data';

const requestCategoryList = createAction('REQUEST_CATEGORY_LIST');
const receiveCategoryList = createAction('RECEIVE_CATEGORY_LIST');

export const fetchCategoryListData = (page, limit, order, orderBy) => {
  return fetch(
    `${CATEGORY_URL}?order=${order}&orderBy=${orderBy}&pageNumber=${page}&rowPerPage=${limit}&siteId=1`,
    {
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN),
      }),
    },
  )
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return new Error(`请求错误:${response.status}`);
    })
    .then(data => {
      let categoryList = data.records;
      categoryList.forEach(category => {
        category.categoryCreateTime = convertDate(category.categoryCreateTime);
        category.categoryUpdateTime = convertDate(category.categoryUpdateTime);
        category.categoryStatus = convertStatus(category.categoryStatus);
      });
      return {
        header: CATEGORY_LIST_HEADER,
        categoryList: categoryList,
        count: data.total,
      };
    })
    .catch(error => {
      alert(`发生错误:${error}`);
    });
};

export function getCategoryList(page, limit, order, orderBy) {
  return async dispatch => {
    dispatch(requestCategoryList());
    const data = await fetchCategoryListData(page, limit, order, orderBy);
    dispatch(receiveCategoryList(data));
  };
}
