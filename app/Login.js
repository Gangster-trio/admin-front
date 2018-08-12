import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import LockIcon from '@material-ui/icons/Lock';

import {Notification, translate, userLogin} from 'react-admin';
import {getToken} from './action/AuthAction';

const styles = theme => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'flex-start',
    background: 'url(https://source.unsplash.com/random/1600x900)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  card: {
    minWidth: 300,
    marginTop: '6em',
  },
  avatar: {
    margin: '1em',
    display: 'flex',
    justifyContent: 'center',
  },
  icon: {
    backgroundColor: theme.palette.secondary.main,
  },
  hint: {
    marginTop: '1em',
    display: 'flex',
    justifyContent: 'center',
    color: theme.palette.grey[500],
  },
  form: {
    padding: '0 1em 1em 1em',
  },
  input: {
    marginTop: '1em',
  },
  actions: {
    padding: '0 1em 1em 1em',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
  },
});
const renderInput = ({
                       meta: {touched, error} = {},
                       input: {...inputProps},
                       ...props
                     }) => (
  <TextField
    error={!!(touched && error)}
    helperText={touched && error}
    {...inputProps}
    {...props}
    fullWidth
  />
);

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleChange = name => (event) => {
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  async handleSubmit(event) {
    event.preventDefault();
    let {code, data} = await getToken(this.state);
    alert(data);
    if (code === 200) {
      window.location.href = '/';
      // this.props.history.push('/');
    }
  }

  render() {
    const {classes} = this.props;
    const {username, password} = this.state;
    return (
      <div className={classes.main}>
        <Card className={classes.card}>
          <div className={classes.avatar}>
            <Avatar className={classes.icon}>
              <LockIcon/>
            </Avatar>
          </div>

          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className={classes.hint}>后台管理登陆界面</div>
            <div className={classes.form}>
              <div>
                <TextField
                  id="Username"
                  label="Username"
                  className={classes.textField}
                  margin="normal"
                  value={username}
                  onChange={this.handleChange('username')}
                  fullWidth
                />
              </div>
              <div>
                <TextField
                  id="Password"
                  label="Password"
                  className={classes.textField}
                  type="password"
                  autoComplete="current-password"
                  margin="normal"
                  value={password}
                  onChange={this.handleChange('password')}
                  fullWidth
                />
              </div>
            </div>

            <CardActions className={classes.actions}>
              <Button
                type='submit'
                variant="raised"
                color="primary"
                className={classes.button}
                fullWidth
              >登陆
              </Button>
            </CardActions>
          </form>
        </Card>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Login);
