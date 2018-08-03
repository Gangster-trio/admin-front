import React from 'react';
import './styles/style.less';
import Table from './components/Table';
import PersistentDrawer from './components/PersistentNavBar';
import Route from 'react-router-dom/Route';
import InboxIcon from '@material-ui/icons/Inbox';
import ListIcon from '@material-ui/icons/List';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import FolderIcon from '@material-ui/icons/Folder';
import SuperVisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import SettingsApplicationIcon from '@material-ui/icons/SettingsApplications';
import StorageIcon from '@material-ui/icons/Storage';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import navRouters from "./router/NavRouters";

const NavList = [
  {
    text: '内容管理',
    icon: <InboxIcon/>,
    child: [
      {
        text: '文章列表',
        icon: <ListIcon/>,
        link: '/article_list'
      },
      {
        text: '栏目列表',
        icon: <FolderIcon/>,
        link: '/category_list'
      },
      {
        text: '审核文章',
        icon: <CheckCircleIcon/>,
        link: '/article_check'
      }
    ]
  },
  {
    text: '权限管理',
    icon: <SuperVisorAccountIcon/>,
    link: '/permission_list',
    child: [
      {
        text:'权限修改',
        icon:<PersonAddDisabledIcon/>,
        link: '/permission_change'
      }
    ]
  },
  {
    text: '系统设置',
    icon: <SettingsApplicationIcon/>,
    link: '/sys_setting',
    child: [
      {
        text: '存储设置',
        icon: <StorageIcon/>,
        link: '/sys_storage'
      }
    ]
  }
];

export default class RootApp extends React.Component {
  render () {
    return (
      <div>
        <PersistentDrawer data={NavList} router={navRouters}/>
      </div>
    );
  }
}
