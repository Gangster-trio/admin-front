import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button/Button';
import { generateId } from '../util/randomHash';
import Typography from '@material-ui/core/Typography/Typography';

class CommonUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputId: props.inputId === undefined ? generateId(10) : props.inputId,
    };
  }

  static propTypes = {
    // 要在button上写的名字
    buttonName: PropTypes.string.isRequired,
    // button的颜色
    color: PropTypes.string.isRequired,
    multiple: PropTypes.bool,
    callback: PropTypes.func.isRequired,
    icon: PropTypes.object,
    inputId: PropTypes.string,
    file_type: PropTypes.string.isRequired,
  };

  static defaultProps = {
    multiple: false,
  };

  handleFileUpload = e => {
    const { file_type } = this.props;
    this.props.callback(file_type, e.target.files);
  };

  render() {
    const { buttonName, multiple, icon } = this.props;
    const { inputId } = this.state;
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
