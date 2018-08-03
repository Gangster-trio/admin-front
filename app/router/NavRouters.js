import ArticleList from '../page/articleList';
import ArticleCreate from '../page/articleCreate';

const navRouters = [
  {
    path: '/article_list',
    component: ArticleList,
  },
  {
    path: '/article_create',
    component: ArticleCreate,
  },
];

export default navRouters;
