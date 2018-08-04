import ArticleList from '../page/ArticleList';
import ArticleAdd from '../page/ArticleAdd';
import { Tree } from '../components/Tree';

const navRouters = [
  {
    path: '/article_list',
    component: ArticleList,
  },
  {
    path: '/article_create',
    component: ArticleAdd,
  },
  {
    path: '/test_tree',
    component: Tree,
  }
];

export default navRouters;
