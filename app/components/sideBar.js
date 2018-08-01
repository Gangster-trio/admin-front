import React from "react";

import '../styles/sideBar.less'
import {Link} from "react-router-dom";

class Logo extends React.Component {
    render() {
        return (
            <div className={'logo'}>
                <span> Gangster-CMS </span>
            </div>
        );
    }
}

class SideNav extends React.Component {
    render() {
        let ul = [];
        let m = this.props.data;
        for (let k in m) {
            ul.push(<SideNavUl key={k} text={k} list={m[k]}/>)
        }
        console.log(ul);
        return (
            <div className={'side-nav'}>
                {ul}
            </div>
        );
    }
}

class SideNavUl extends React.Component {
    render() {
        let li = [];
        for (let k in this.props.list) {
            li.push(
                <SideNavLi key={k} text={k} link={this.props.list[k]}/>
            )
        }
        return (
            <ul key={this.props.text}>
                <span>{this.props.text}</span>
                <div className={'more'}/>
                {li}
            </ul>
        );
    }
}

class SideNavLi extends React.Component {
    render() {
        return (
            <Link to={this.props.link} key={this.props.text}>
                <li>
                    {this.props.text}
                </li>
            </Link>
        )
    }
}

export default class SideBar extends React.Component {
    render() {
        console.log(this.props.data);
        return (
            <div className={'components-side-bar'}>
                <Logo/>
                <SideNav data={this.props.data}/>
            </div>
        );
    }
}