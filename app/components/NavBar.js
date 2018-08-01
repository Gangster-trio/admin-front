import AppBar from "@material-ui/core/AppBar/AppBar";
import React from "react";
import {withStyles} from '@material-ui/core/styles';
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from "@material-ui/core/Drawer/Drawer";
import PropTypes from 'prop-types'
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from "@material-ui/core/Collapse/Collapse";
import Button from '@material-ui/core/Button';
import ListSubheader from "@material-ui/core/ListSubheader/ListSubheader";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography/Typography";
import NavLink from "react-router-dom/es/NavLink";

const styles = theme => ({
    nav_root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    flex: {
        flexGrow: 1,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
    nav_a: {
        textDecoration: 'none'
    }
});


export const dataShape = PropTypes.shape(
    {
        text: PropTypes.string.isRequired,
        link: PropTypes.string,
        child: PropTypes.arrayOf(PropTypes.object)
    }
);

class NavBar extends React.Component {

    state = {
        drawerShow: false,
    };

    static propTypes = {
        data: PropTypes.arrayOf(dataShape)
    };

    handleToggle = () => this.setState({drawerShow: !this.state.drawerShow});

    isLiExpand = (v) => this.state[this.formatLiExpand(v)];

    formatLiExpand = (v) => 'item_' + v.text + "_isExpand";

    changeLiExpand = (v) => () =>
        this.setState((stat) => {
            stat[this.formatLiExpand(v)] = !stat[this.formatLiExpand(v)];
            return stat
        });


    renderListItem = (data, isNested) => {

        return (
            <List component='div'
                  subheader={
                      isNested ? '' : (<ListSubheader component="div">Gangster-CMS</ListSubheader>)
                  }>
                {data.map((v, i) => (
                    <div key={v.text}>
                        <ListItem key={v.text} button
                                  className={isNested ? this.props.classes.nested : ''}
                                  onClick={this.changeLiExpand(v)}>
                            <ListItemText inset primary={v.text}/>
                            {v.child !== undefined ? (this.isLiExpand(v) ? (<ExpandLess/>) : (<ExpandMore/>)) : null}
                        </ListItem>
                        {v.child !== undefined ? (
                            <Collapse in={this.isLiExpand(v)} timeout="auto" unmountOnExit>
                                {this.renderListItem(v.child, true)}
                            </Collapse>) : undefined
                        }
                    </div>
                ))}
            </List>
        )
    };

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.nav_root}>
                <AppBar position='sticky'>
                    <Toolbar>
                        <IconButton onClick={this.handleToggle} color="inherit">
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            Gangster-CMS
                        </Typography>
                        <Button color='inherit'>
                            登陆
                        </Button>
                    </Toolbar>
                    <Drawer open={this.state.drawerShow} onClose={this.handleToggle}>
                        {/*{this.renderListItem(this.props.data, false)}*/}
                        <List subheader={<ListSubheader component="div">Gangster-CMS</ListSubheader>}>
                            {this.props.data.map((v) => this.renderListItem_new(v))}
                        </List>
                    </Drawer>
                </AppBar>

            </div>
        );
    }

    renderListItem_new = (item) => {
        if (item.child === undefined) {
            return (
                <NavLink className={this.props.classes.nav_a} key={item.link} activeClassName='active' to={item.link}>
                    <ListItem button key={item.text} onClick={this.handleToggle}>
                        <ListItemText inset primary={item.text}/>
                    </ListItem>
                </NavLink>
            )
        }
        //带有子节点的导航
        return (
            <div key={item.text}>
                <ListItem button key={item.text} onClick={this.changeLiExpand(item)}>
                    <ListItemText inset primary={item.text}/>
                    {this.isLiExpand(item) ? (<ExpandLess/>) : (<ExpandMore/>)}
                </ListItem>
                <Collapse in={this.isLiExpand(item)} timeout='auto' unmountOnExit>
                    <List>
                        {item.child.map((v) => (
                            <NavLink className={this.props.classes.nav_a} key={v.link} to={v.link}
                                     activeClassName='active'>
                                <ListItem button className={this.props.classes.nested} onClick={this.handleToggle}>
                                    <ListItemText inset primary={v.text}/>
                                </ListItem>
                            </NavLink>
                        ))}
                    </List>
                </Collapse>
            </div>
        )
    }
}

export default withStyles(styles)(NavBar);