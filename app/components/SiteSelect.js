import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { ACCESS_TOKEN, GET_AUTH_SITE } from '../util/data';

const options = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel',
];

const ITEM_HEIGHT = 48;

class SiteSelect extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    localStorage.setItem('site', '23');
    this.setState({ anchorEl: null });
  };

  UNSAFE_componentWillMount() {
    fetch(GET_AUTH_SITE, {
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN),
      }),
    })
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        }
        alert('无法获取授权的站点');
        throw new Error('can not get auth site');
      })
      .then(siteList => {
        if (siteList.length === 0) {
          alert('您没有权限访问任何站点');
        }
      });
  }

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={anchorEl ? 'long-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
            },
          }}
        >
          {options.map(option => (
            <MenuItem key={option} selected={option === 'Pyxis'} onClick={this.handleClose}>
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

export default SiteSelect;
