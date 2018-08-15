import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {Route} from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse/Collapse';
import NavLink from 'react-router-dom/es/NavLink';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {logout} from '../action/AuthAction';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  appFrame: {
    height: '100%',
    zIndex: theme.zIndex.appBar,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'fixed',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'appBarShift-left': {
    marginLeft: drawerWidth,
  },
  'appBarShift-right': {
    marginRight: drawerWidth,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'fixed',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    height: '64px',
    ...theme.mixins.toolbar,
  },
  main: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    overflow: 'auto',
    // padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    position: 'relative',
    height: '100%',
    width: '100%',
  },
  mainShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  //以下两个类当Drawer open时应用
  'mainShift-left': {
    marginLeft: drawerWidth,
  },
  'mainShift-right': {
    marginRight: drawerWidth,
  },
  content: {
    position: 'absolute',
    width: '100%',
    height: 'calc(100% - 64px)',
  },
  active: {
    background: theme.palette.action.selected,
  },
  list_item: {
    padding: '12px',
  },
  row: {
    // display: 'flex',
    // justifyContent: 'center',
  },
  avatar: {
    margin: 10,
    float: 'right'
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
});

class PersistentDrawer extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        icon: PropTypes.object,
        link: PropTypes.string,
        child: PropTypes.arrayOf(PropTypes.object),
      }),
    ),
    router: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      anchor: 'left',
      anchorEl: null,
    };
  }

  handleClick = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  // 关闭然后登出
  handleClose = name => () => {
    this.setState({anchorEl: null});
    if (name === 'logout') {
      logout();
    }
  };

  handleDrawerOpen = () => {
    this.setState({open: true});
  };

  handleDrawerClose = () => {
    this.setState({open: false});
  };

  isLiExpand = v => {
    return this.state[this.formatLiExpand(v)];
  };

  formatLiExpand = v => 'item_' + v.text + '_isExpand';

  changeLiExpand = v => {
    return () =>
      this.setState(stat => {
        stat[this.formatLiExpand(v)] = !stat[this.formatLiExpand(v)];
        return stat;
      });
  };

  renderListItem(item) {
    if (item.child === undefined) {
      return (
        <ListItem
          component={NavLink}
          key={item.text}
          activeClassName={this.props.classes.active}
          to={item.link}
          disableGutters
          className={this.props.classes.list_item}
          button
        >
          {item.icon}
          <ListItemText inset primary={item.text}/>
        </ListItem>
      );
    }

    // 带有子节点的导航
    return (
      <div key={item.text}>
        <ListItem
          disableGutters
          button
          key={item.text}
          onClick={this.changeLiExpand(item)}
          className={this.props.classes.list_item}
        >
          {item.icon}
          <ListItemText inset primary={item.text}/>
          {this.isLiExpand(item) ? <ExpandLess/> : <ExpandMore/>}
        </ListItem>
        <Collapse in={this.isLiExpand(item)} timeout="auto" unmountOnExit>
          <List>
            {item.child.map(v => (
              <ListItem
                component={NavLink}
                to={v.link}
                key={v.link}
                activeClassName={this.props.classes.active}
                button
              >
                {v.icon}
                <ListItemText inset primary={v.text}/>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </div>
    );
  }

  render() {
    const {classes, theme, data, router} = this.props;
    const {anchor, open, anchorEl} = this.state;

    const drawer = (
      <Drawer
        variant="persistent"
        anchor={anchor}
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Gangster-CMS
          </Typography>
          <IconButton onClick={this.handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
          </IconButton>
        </div>
        <Divider/>
        <List>{data.map(v => this.renderListItem(v))}</List>
      </Drawer>
    );

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
              [classes[`appBarShift-${anchor}`]]: open,
            })}
          >
            <Toolbar disableGutters={!open}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon/>
              </IconButton>
              <Typography variant="title" color="inherit" noWrap>
                后台管理系统
              </Typography>
              <div style={{position: 'absolute', right: 10}}>
                <IconButton
                  aria-owns={anchorEl ? 'simple-menu' : null}
                  aria-haspopup="true"
                  onClick={this.handleClick}

                >
                  <AccountCircleIcon/>
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose()}
                >
                  <MenuItem onClick={this.handleClose('profile')}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose('account')}>My account</MenuItem>
                  <MenuItem onClick={this.handleClose('logout')}>Logout</MenuItem>
                </Menu>
              </div>
            </Toolbar>
          </AppBar>
          {drawer}
          <main
            className={classNames(classes.main, {
              [classes.mainShift]: open,
              [classes[`mainShift-${anchor}`]]: open,
            })}
          >
            <div className={classes.drawerHeader}/>
            <div className={classes.content}>
              {router.map(v => (
                <Route key={v.path} path={v.path} component={v.component}/>
              ))}
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, {withTheme: true})(PersistentDrawer);
