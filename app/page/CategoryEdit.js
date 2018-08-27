import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import { fetchUpdateCategoryInfo, updateCategory } from '../action/categoryEditAction';
import { Tree } from '../components/Tree';
import CommonUpload from '../components/CommonUpload';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button/Button';
import Done from '@material-ui/icons/Done';
import Cancel from '@material-ui/icons/Cancel';
import connect from 'react-redux/es/connect/connect';
import { CATEGORY_INDEX, category_type_data } from '../util/data';
import SingleSelect, { UPDATE_OPERATION } from '../components/SingleSelect';
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress';
import Dialogs from '../components/Dialogs';
import CustomizedSnackbars from '../components/Snackbars';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    margin: theme.spacing.unit * 5,
    padding: theme.spacing.unit * 5,
  },
  text_field: {
    margin: '10px',
    minWidth: '200px',
  },
  dialog_paper: {
    minWidth: '300px',
  },
});

const initState = {
  ca_select_open: false,
  parent_category_id: null,
  old_category: null,
  parent_category_title: '',
  skin_id: -1,
  type_id: -1,
  parentCategory: null,
  category: null,
  all_files: {
    img: null,
    files: null,
  },
  isFetching: true,
  isSubmitting: false,
  updateSuccess: undefined, // 设置文章是否上传成功,没有上传，就为undefined
};

class CategoryEdit extends React.Component {
  static propTypes = {
    categoryId: PropTypes.string,
    classes: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    isUpdating: PropTypes.bool.isRequired,
    category: PropTypes.object,
    ca_data: PropTypes.array,
    parentCategory: PropTypes.object,
    callbackMessage: PropTypes.object,
    match: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = initState;
  }

  componentDidMount() {
    const categoryId = this.props.match.params.id;
    this.props.dispatch(fetchUpdateCategoryInfo(categoryId));
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      category: nextProps.category,
      isFetching: nextProps.isFetching,
      parent_category_title: nextProps.parentCategory.categoryTitle,
    });
  }

  componentWillUnmount() {
    this.setState = initState;
  }

  onSelectCa = data => {
    this.setState(prevState => ({
      parent_category_id: data.categoryId,
      parent_category_title: data.categoryTitle,
      ca_select_open: false,
      parentCategory: {
        ...prevState.parentCategory,
        parentCategoryId: data.categoryId,
      },
    }));
  };

  handleChange = name => event => {
    const value = event.target.value;
    this.setState(prevState => ({
      category: {
        ...prevState.category,
        [name]: value,
      },
    }));
  };

  handleSelectValue = (item, value) => {
    this.setState(prevState => ({
      category: {
        ...prevState.category,
        [item]: value,
      },
    }));
  };

  handleAllFileUpload = (item, file) => {
    if (file) {
      if (item === 'img') {
        file = file[0];
      }
      this.setState(prevState => ({
        all_files: {
          ...prevState.all_files,
          [item]: file,
        },
      }));
    }
  };

  handleValid = () => {
    const { category } = this.state;
    this.setState({
      isSubmitting: true, // 将当前状态修改为正在提交状态，用来验证输入的有效性
    });
    return !!(category.categoryTitle && category.categoryParentId && category.categoryType);
  };

  async handleCategorySubmit() {
    const { category, all_files } = this.state;
    const { dispatch } = this.props;
    if (this.handleValid()) {
      await dispatch(updateCategory({ category, all_files }));
      const { callbackMessage } = this.props;
      let status;
      callbackMessage.code === 200 ? (status = 'success') : (status = 'failed');
      this.setState({
        updateSuccess: status,
      });
    } else {
      alert('请填写必要的字段信息');
    }
  }

  render() {
    const { classes, ca_data } = this.props;
    const {
      ca_select_open,
      parent_category_title,
      category,
      isSubmitting,
      isFetching,
      updateSuccess,
    } = this.state;
    if (isFetching) {
      return <LinearProgress color="secondary" />;
    }
    return (
      <Paper className={classes.root}>
        <div>
          <Typography variant="title">更新栏目:</Typography>
          <TextField
            id="title"
            className={classes.text_field}
            autoFocus={true}
            label="栏目标题"
            error={isSubmitting && !category.categoryTitle}
            margin="normal"
            placeholder="请输入标题"
            required={true}
            value={category.categoryTitle}
            onChange={this.handleChange('categoryTitle')}
          />

          <TextField
            className={classes.text_field}
            label="自定义顺序"
            margin="normal"
            placeholder="请输入数字"
            type="number"
            value={category.categoryOrder}
            onChange={this.handleChange('categoryOrder')}
          />

          <SingleSelect
            item={'categoryType'}
            suggestions={category_type_data}
            initValue={category.categoryType}
            placeholder="请输入栏目类型"
            operation={UPDATE_OPERATION}
            onSelectValue={this.handleSelectValue.bind(this)}
          />

          <TextField
            className={classes.text_field}
            label="选择皮肤"
            margin="normal"
            placeholder="请输入皮肤名字"
            value={category.categorySkin}
            onChange={this.handleChange('categorySkin')}
          />
        </div>

        <div>
          <TextField
            className={classes.text_field}
            label="栏目选择"
            margin="normal"
            placeholder="点击选择栏目"
            required={true}
            helperText="Click to select category"
            value={parent_category_title}
            // error={isSubmitting && !category.parentCategoryId}
            onClick={() => this.setState({ ca_select_open: true })}
          />

          <Dialog
            classes={{
              paper: classes.dialog_paper,
            }}
            onClose={() => this.setState({ ca_select_open: false })}
            open={ca_select_open}
          >
            <DialogTitle>选择栏目</DialogTitle>
            <Tree data={ca_data} onSelect={this.onSelectCa} title="categoryTitle" />
          </Dialog>

          <TextField
            className={classes.text_field}
            label="栏目描述"
            margin="normal"
            placeholder="请输入栏目描述"
            required={true}
            value={category.categoryDesc}
            onChange={this.handleChange('categoryDesc')}
          />
        </div>

        <div style={{ margin: '20px 0 20px 0' }}>
          <CommonUpload
            buttonName={'主图上传'}
            color={'primary'}
            file_type="img"
            callback={this.handleAllFileUpload.bind(this)}
            icon={<CloudUploadIcon />}
          />
        </div>

        <Dialogs
          ref={instance => {
            this.child = instance;
          }}
          title={'From Gangster Cms Message'}
          contentText={`确定修改标题为: ${category.categoryTitle}的栏目?`}
          onEventSubmit={this.handleCategorySubmit.bind(this)}
        />

        {updateSuccess !== undefined ? (
          <CustomizedSnackbars
            ref={instance => {
              this.child = instance;
            }}
            variant={updateSuccess}
            message={updateSuccess ? '更新成功' : '更新失败'}
            redirect={CATEGORY_INDEX}
          />
        ) : null}

        <Button
          style={{ margin: '10px' }}
          color="primary"
          variant="contained"
          onClick={() => {
            this.child.handleClickOpen();
          }}
        >
          <Typography color="inherit" style={{ paddingRight: '10px' }}>
            立即提交
          </Typography>
          <Done />
        </Button>

        <Button style={{ margin: '10px' }} color="primary" variant="contained">
          <Typography color="inherit" style={{ paddingRight: '10px' }}>
            重置
          </Typography>
          <Cancel />
        </Button>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.categoryEdit.isFetching,
  isUpdating: state.categoryEdit.isUpdating,
  ca_data: state.categoryEdit.data.categoryTree,
  category: state.categoryEdit.data.category,
  parentCategory: state.categoryEdit.data.parentCategory,
  callbackMessage: state.categoryEdit.callbackMessage,
});

export default withStyles(styles)(connect(mapStateToProps)(CategoryEdit));
