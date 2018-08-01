import {createAction} from 'redux-actions';
import {ARTICLE_LIST, ARTICLE_LIST_HEADER } from "../mock/article/article_list";


const requestArticleList = createAction('REQUEST_ARTICLE_LIST');
const receiveArticleList = createAction('RECEIVE_ARTICLE_LIST');

const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                header:ARTICLE_LIST_HEADER,
                articles:ARTICLE_LIST,
            });
        }, 500)
    })
};

export const getArticleList = () => async dispatch => {
    dispatch(requestArticleList());
    let data = await fetchData();
    dispatch(receiveArticleList(data));
};