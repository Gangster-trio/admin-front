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
  label: suggestion.label
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

export const USER_INFO = 'USER_INFO';

export const IS_LOGINED = 'IS_LOGINED';

export const ACCESS_TOKEN = 'accessToken';

export const ARTICLE_INDEX = '/article_list';

const URL_PRE = 'http://smy.xkenmon.cn:8080';

export const ARTICLE_URL = `${URL_PRE}/article`;

export const CATEGORY_URL = `${URL_PRE}/category`;

export const FETCH_LOGIN_TOKEN_URL = `${URL_PRE}/auth`;

export const HTTP_TOKEN_URL = `${URL_PRE}/qiniu/upToken`;

export const CATEGORY_TREE_URL = `${URL_PRE}/category/tree`;

export const HTTP_DOMAIN_URL = `${URL_PRE}/qiniu/cdnDomain`;
