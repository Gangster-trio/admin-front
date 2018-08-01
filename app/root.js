import React from 'react';
import './styles/style.less';
import Table from './components/Table';
import PersistentDrawer from './components/PersistentNavBar';
import Route from 'react-router-dom/Route';

const NavList = [
  {
    text: '内容管理',
    child: [
      {
        text: '文章列表',
        link: '/article_list'
      },
      {
        text: '栏目列表',
        link: '/category_list'
      },
      {
        text: '审核文章',
        link: '/article_check'
      }
    ]
  },
  {
    text: '权限管理',
    link: '/permission_list'
  },
  {
    text: '系统设置',
    link: '/sys_setting'
  }
];

export default class RootApp extends React.Component {
  render() {
    return (
      <div>
        <PersistentDrawer data={NavList} />
        <div className="content">
          <Route path="/table_example" component={Table} />
        </div>
      </div>
    );
  }
}
