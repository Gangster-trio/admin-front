import ArticleList from '../page/ArticleList';
import ArticleAdd from '../page/ArticleAdd';
import ArticleEdit from '../page/ArticleEdit';
import CategoryAdd from '../page/CategoryAdd';
import CategoryEdit from '../page/CategoryEdit';
import CategoryList from '../page/CategoryList';

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
    path: '/article_edit/:id',
    component: ArticleEdit,
  },
  {
    path: '/category_edit/:id',
    component: CategoryEdit,
  },
  {
    path: '/category_list',
    component: CategoryList,
  },
  {
    path: '/category_create',
    component: CategoryAdd,
  },
];

export default navRouters;
