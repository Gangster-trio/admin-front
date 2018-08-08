import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import purple from "@material-ui/core/colors/purple";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import CommonUpload from "../components/CommonUpload";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CreatableMulti from "../components/Select";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 5
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  cssLabel: {
    "&$cssFocused": {
      color: purple[500]
    },
    "padding-right": 20
  },
  cssFocused: {},
  cssUnderline: {
    "&:after": {
      borderBottomColor: purple[500]
    }
  },

  button: {
    margin: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  descTextField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 550
  }
});

class AddArticle extends React.Component {
  state = {
    articleType: "",
    open: false
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  generateFileUploadDOM() {
    return <CloudUploadIcon className={this.props.classes.rightIcon}/>;
  }

  // 文件上传的回调
  fileUploadCallback(file) {
    alert(file);
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Paper className={classes.root} elevation={1}>
          <Typography variant="headline" component="h3">
            Article Manager
          </Typography>

          <TextField
            id="with-placeholder"
            label="文章标题"
            placeholder="Placeholder"
            className={classes.textField}
            margin="normal"
          />

          <TextField
            id="placeholder"
            label="文章作者"
            placeholder="Placeholder"
            className={classes.textField}
            margin="normal"
          />

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="demo-controlled-open-select">文章类型</InputLabel>
            <Select
              open={this.state.open}
              onClose={this.handleClose}
              onOpen={this.handleOpen}
              value={this.state.articleType}
              onChange={this.handleChange}
              inputProps={{
                name: "articleType",
                id: "demo-controlled-open-select"
              }}
            >
              <MenuItem value="视频">视频</MenuItem>
              <MenuItem value="首页文章">首页文章</MenuItem>
              <MenuItem value="普通文章">普通文章</MenuItem>
              <MenuItem value="轮播图">轮播图</MenuItem>
            </Select>
          </FormControl>

          <div>
            <TextField
              id="placeholder"
              label="文章描述"
              placeholder="Placeholder"
              className={classes.descTextField}
              margin="normal"
            />
          </div>

          <div>
            <CommonUpload
              buttonName={"文章缩略图"}
              url="http://localhost:8080/file/upload"
              color="primary"
              multiple={true}
              hashIdLength={10}
              icon={<CloudUploadIcon/>}
              callback={this.fileUploadCallback}
              inputId="test"
            />

            <CommonUpload
              buttonName="附件上传"
              url="http://localhost:8080/file/upload/1"
              color="primary"
              multiple={false}
              hashIdLength={30}
              icon={<CloudUploadIcon/>}
              callback={this.fileUploadCallback}
            />
          </div>

          <Typography>
            <CreatableMulti/>
          </Typography>
        </Paper>
      </div>
    );
  }
}

AddArticle.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddArticle);
