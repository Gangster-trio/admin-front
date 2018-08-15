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

const URL_PRE = 'http://smy.xkenmon.cn:8080';

export const ARTICLE_URL = `${URL_PRE}/article`;

export const CATEGORY_TREE_URL = `${URL_PRE}/category/tree`;

export const HTTP_ADDR_URL = `${URL_PRE}/qiniu/upHttpAddr`;

export const HTTP_TOKEN_URL = `${URL_PRE}/qiniu/upToken`;

export const HTTP_DOMAIN_URL = `${URL_PRE}/qiniu/cdnDomain`;

export const FETCH_LOGIN_TOKEN_URL = `${URL_PRE}/auth`;

export const CATEGORY_URL = `${URL_PRE}/category`;

export const LOGIN_URL = `${URL_PRE}/login`;


export const ACCESS_TOKEN = 'accessToken';

export const FIRST_LOAD_PAGE = 'firsLoadPage';

export const TIMER_ID = 'timer_id';

export const USER_INFO = 'USER_INFO';

export const IS_LOGINED = 'IS_LOGINED';


// 超时设置
// export const TIME_OUT_LIMIT = 255000;