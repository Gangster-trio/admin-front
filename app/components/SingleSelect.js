/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import {emphasize} from '@material-ui/core/styles/colorManipulator';
import CreatableSelect from 'react-select/lib/Creatable';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  input: {
    display: 'flex',
    padding: 0,
  },
  valueContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    fontSize: 16,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  select: {
    width: 200,
    height: 48,
    // margin: 10,
    margin: theme.spacing.unit * 2,
    display: 'inline-block'
  }
});

/**
 * @return {null}
 */
function NoOptionsMessage(props) {
  // return null;
  return <Typography
    color="textSecondary"
    className={props.selectProps.classes.noOptionsMessage}
  >
    {props.children}
  </Typography>;
}

function inputComponent({inputRef, ...props}) {
  return <div ref={inputRef} {...props} />;
}


function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          ref: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

const components = {
  Option,
  Control,
  NoOptionsMessage,
  Placeholder,
  SingleValue,
  ValueContainer,
};

class SingleSelect extends React.Component {

  static propTypes = {
    suggestions: PropTypes.array.isRequired,          // 侯选项
    item: PropTypes.string.isRequired,                // 填写字段的名字
    placeholder: PropTypes.string.isRequired,          // 在placeholder处写的内容
    onSelectValue: PropTypes.func.isRequired
  };

  state = {
    single: null,
  };


  handleChange = name => data => {
    const {item} = this.props;
    this.setState({
      [name]: data,
    });
    this.props.onSelectValue(item, data.value);
  };

  render() {
    const {classes, placeholder, suggestions} = this.props;


    return (
      <div className={classes.select}>
        <NoSsr>
          <CreatableSelect
            color={'primary'}
            classes={classes}
            options={suggestions}
            components={components}
            value={this.state.single}
            onChange={this.handleChange('single')}
            placeholder={placeholder}
          />
        </NoSsr>
      </div>
    );
  }
}

SingleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleSelect);
