import React from "react";
import SideBar from "./components/sideBar";
import TopBar from "./components/topBar";
import {Route} from 'react-router-dom';
import './styles/style.less';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import green from '@material-ui/core/colors/green';
import {Switch} from "react-router-dom";
import NavRouters from './router/NavRouters'
import Redirect from "react-router-dom/es/Redirect";
import Router from "react-router-dom/es/Router";
import ArticleList from './page/articleList'
import NavBar from "./components/NavBar";
import blue from "@material-ui/core/es/colors/blue";
import Table from "./components/Table";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: blue[300],
            main: blue[500],
            dark: blue[700],
        },
        secondary: {
            light: green[300],
            main: green[500],
            dark: green[700],
        },
    },
});

const NavList = [
    {
        text: "内容管理",
        child: [
            {
                text: "文章列表",
                link: "/article_list"
            }, {
                text: "栏目列表",
                link: '/category_list'
            }, {
                text: "审核文章",
                link: '/article_check'
            }
        ]
    }, {
        text: "权限管理",
        link: "/permission_list"
    }, {
        text: "系统设置",
        link: '/sys_setting'
    }
];

const LIST = {
    "内容管理": {
        "文章列表": "/article_list",
        "栏目列表": "/category_list",
        "审核文章": "/article_check",
    },
    "权限管理": {
        "查看权限": "/permission_list",
    }
};

// 不能用,,,
const switchRoutes = (
    NavRouters.map((prop, key) => {
        if (prop.redirect)
            return <Redirect from={prop.path} to={prop.to} key={key}/>;
        return <Route path={prop.path} component={prop.component}/>;
    })
);

export default class RootApp extends React.Component {
    render() {
        return (
           // {/*<MuiThemeProvider theme={theme}>*/}
                <div>
                    {/*<TopBar/>*/}
                    {/*<SideBar data={LIST}/>*/}
                    {<NavBar data={NavList}/>}
                    <div className='content'>
                        <Route path={'/article_list'} component={ArticleList}/>
                        <Route path={'/table_example'} component={Table}/>
                    </div>
                </div>
            // </MuiThemeProvider>
        );
    }
}