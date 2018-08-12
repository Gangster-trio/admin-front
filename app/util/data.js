export const article_type_data = [
  {
    label: '主页文章'
  }, {
    label: '轮播图'
  }, {
    label: '普通文章'
  }
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}));


export const skin_data = [
  {
    name: '粉红',
    id: 1
  }, {
    name: '骚紫',
    id: 2
  }, {
    name: '靓蓝',
    id: 3
  }
];

const URL_PRE = 'http://smy.xkenmon.cn:9080';

export const URL_ARTICLE_PRE = `${URL_PRE}/article`;

export const URL_CATEGORY_TREE = `${URL_PRE}/category/tree`;

export const URL_HTTP_ADDR = `${URL_PRE}/qiniu/upHttpAddr`;

export const URL_HTTP_TOKEN = `${URL_PRE}/qiniu/upToken`;

export const URL_HTTP_DOMAIN = `${URL_PRE}/qiniu/cdnDomain`;

export const URL_FETCH_LOGIN_TOKEN = `${URL_PRE}/auth`;

export const LOGIN_URL = `${URL_PRE}/login`;

export const ACCESS_TOKEN = 'accessToken';

export const FIRST_LOAD_PAGE = 'firsLoadPage';

export const TIMER_ID = 'timer_id';

export const USER_INFO = 'USER_INFO';

export const IS_LOGINED = 'IS_LOGINED';


// 超时设置
// export const TIME_OUT_LIMIT = 255000;