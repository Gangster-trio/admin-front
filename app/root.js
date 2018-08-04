import { lightBlue, pink } from '@material-ui/core/colors';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import ArchiveIcon from '@material-ui/icons/Archive';
import BarChartIcon from '@material-ui/icons/BarChart';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import FolderIcon from '@material-ui/icons/Folder';
import ListIcon from '@material-ui/icons/List';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import SettingsApplicationIcon from '@material-ui/icons/SettingsApplications';
import StorageIcon from '@material-ui/icons/Storage';
import SuperVisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import React from 'react';
import Route from 'react-router-dom/Route';
import PersistentDrawer from './components/PersistentNavBar';
import Table from './components/Table';
import navRouters from './router/NavRouters';
import './styles/style.less';

const NavList = [
  {
    text: '内容管理',
    icon: <ArchiveIcon/>,
    child: [
      {
        icon: <ListIcon/>,
        link: '/article_list',
        text: '文章列表',
      },
      {
        text: '栏目列表',
        icon: <FolderIcon/>,
        link: '/category_list',
      },
      {
        text: '审核文章',
        icon: <CheckCircleIcon/>,
        link: '/article_check',
      },
    ],
  },
  {
    text: '权限管理',
    icon: <SuperVisorAccountIcon/>,
    link: '/permission_list',
    child: [
      {
        text: '权限修改',
        icon: <PersonAddDisabledIcon/>,
        link: '/permission_change',
      },
    ],
  },
  {
    text: '报表统计',
    icon: <BarChartIcon/>,
    link: '/chart',
  },
  {
    icon: <SettingsApplicationIcon/>,
    link: '/sys_setting',
    text: '系统设置',
    child: [
      {
        icon: <StorageIcon/>,
        link: '/sys_storage',
        text: '存储设置',
      },
    ],
  },
];

const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: pink,
  },
});

export default class RootApp extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <PersistentDrawer data={NavList} router={navRouters}/>
          <div className='content'>
            <Route path='/table_example' component={Table}/>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
