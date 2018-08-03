import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button/Button';
import { generateId } from '../util/randomHash';
import Typography from '@material-ui/core/Typography/Typography';

class CommonUpload extends React.Component {
  static propTypes = {
    // 要在button上写的名字
    buttonName: PropTypes.string.isRequired,
    // button的颜色
    color: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    multiple: PropTypes.bool.isRequired,
    callback: PropTypes.func.isRequired,
    hashIdLength: PropTypes.number.isRequired,
    icon: PropTypes.object,
    inputId: PropTypes.string,
  };

  handleFileUpload = e => {
    this.props.callback(e.target.files);
  };

  static defaultProps = {
    inputId: generateId(10),
  };

  render() {
    const { buttonName, multiple, inputId, icon } = this.props;
    return (
      <Fragment>
        <input
          multiple={multiple}
          onChange={this.handleFileUpload}
          id={inputId}
          type="file"
          hidden={true}
        />
        <label htmlFor={inputId}>
          <Button
            style={{ marginLeft: 10, marginRight: 10 }}
            color={this.props.color}
            variant="contained"
            component="span"
          >
            <Typography color="inherit" style={{ paddingRight: '10px' }}>
              {buttonName}
            </Typography>
            {icon}
          </Button>
        </label>
      </Fragment>
    );
  }
}

export default CommonUpload;
