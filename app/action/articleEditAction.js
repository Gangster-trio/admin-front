import { createAction } from "redux-actions";
import { ARTICLE_LIST, ARTICLE_LIST_HEADER, MOCK_DB_getArticle } from "../mock/article/article_list";

const requestSingleArticle = createAction("REQUEST_SINGLE_ARTICLE");
const receiveSingleArticle = createAction("RECEIVE_SINGLE_ARTICLE");

export const fetchSingleArticle = articleId => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        article: ARTICLE_LIST[0]
      });
    }, 1000);
  });
  // console.log(articleId);
  // return fetch("http://smy.xkenmon.cn:9080/article/345")
  //   .then(response => {
  //       if (response.ok) {
  //         return response.json();
  //       }
  //       throw new Error("请求错误:" + response.status);
  //     }
  //   )
  //   .catch(error => {
  //     console.log(`error: ${error.message}`);
  //   });
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

