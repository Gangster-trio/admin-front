import React from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField/TextField';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import { addCategory } from '../action/categoryAddAction';
import { Tree } from '../components/Tree';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CommonUpload from '../components/CommonUpload';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button/Button';
import Done from '@material-ui/icons/Done';
import { getCategoryTree } from '../action/categoryTree';
import { connect } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress';
import SingleSelect, { ADD_OPERATION } from '../components/SingleSelect';
import { category_type_data, CATEGORY_INDEX } from '../util/data';
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
  category_parent_id: null,
  ca_select_open: false,
  category_title: '',
  skin_id: -1,
  type_id: '',
  category: {
    categoryParentId: null,
    categoryCreateTime: null,
    categoryDesc: null,
    categoryHit: 0,
    categoryId: null,
    categoryOrder: null,
    categorySiteId: null,
    categorySkin: null,
    categoryStatus: 0,
    categoryThumb: null,
    categoryTitle: null,
    categoryType: null,
    categoryUpdateTime: null,
  },
  isSubmitting: false,
  addSuccess: undefined, // 设置是否上传成功,没有上传，就为undefined
};

class CategoryAdd extends React.Component {
  static propTypes = {
    ca_data: PropTypes.array,
    callbackMessage: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    categoryTreeIsFetching: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = initState;
  }

  onSelectCa = data => {
    this.setState(prevState => ({
      category_parent_id: data.categoryId,
      category_title: data.categoryTitle,
      ca_select_open: false,
      category: {
        ...prevState.category,
        categoryParentId: data.categoryId,
      },
    }));
  };

  componentDidMount() {
    const dispatch = this.props.dispatch;
    dispatch(getCategoryTree());
  }

  componentWillUnmount() {
    this.setState(initState);
  }

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
    return category.categoryTitle && category.categoryParentId && category.categoryType;
  };

  async handleSubmit() {
    const { dispatch } = this.props;
    const { category, all_files } = this.state;
    if (this.handleValid()) {
      await dispatch(addCategory({ category, all_files }));
      const { callbackMessage } = this.props;
      let status;
      callbackMessage.code === 200 ? (status = 'success') : (status = 'failed');
      this.setState({
        addSuccess: status,
      });
    } else {
      alert('请填写必要字段');
    }
  }

  render() {
    const { classes, ca_data, categoryTreeIsFetching } = this.props;
    const { ca_select_open, category_title, category, isSubmitting, addSuccess } = this.state;

    if (categoryTreeIsFetching) {
      return <LinearProgress color="secondary" />;
    }
    return (
      <Paper className={classes.root}>
        <div>
          <Typography variant="title">添加栏目:</Typography>
          <TextField
            className={classes.text_field}
            autoFocus={true}
            label="栏目标题"
            margin="normal"
            placeholder="请输入标题"
            required={true}
            error={isSubmitting && !category.categoryTitle}
            onChange={this.handleChange('categoryTitle')}
          />

          <TextField
            className={classes.text_field}
            label="自定义顺序"
            margin="normal"
            placeholder="请输入数字"
            type="number"
            onChange={this.handleChange('categoryOrder')}
          />

          <SingleSelect
            item={'categoryType'}
            // initValue=''
            suggestions={category_type_data}
            placeholder="请输入栏目类型"
            operation={ADD_OPERATION}
            onSelectValue={this.handleSelectValue.bind(this)}
          />

          <TextField
            className={classes.text_field}
            label="选择皮肤"
            margin="normal"
            placeholder="请输入皮肤名字"
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
            value={category_title}
            error={isSubmitting && !category.categoryParentId}
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
            onChange={this.handleChange('categoryDesc')}
          />
        </div>

        <div style={{ margin: '20px 0 20px 0' }}>
          <CommonUpload
            buttonName={'主图上传'}
            color={'primary'}
            file_type="img"
            callback={this.handleAllFileUpload}
            icon={<CloudUploadIcon />}
          />
        </div>

        <Dialogs
          ref={instance => {
            this.child = instance;
          }}
          title={'From Gangster Cms Message'}
          contentText={`确定添加标题为: ${category.categoryTitle}的栏目?`}
          onEventSubmit={this.handleSubmit.bind(this)}
        />

        {addSuccess !== undefined ? (
          <CustomizedSnackbars
            ref={instance => {
              this.child = instance;
            }}
            variant={addSuccess}
            message={addSuccess ? '添加成功' : '添加失败'}
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
        </Button>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  ca_data: state.categoryTreeList.data,
  callbackMessage: state.categoryAdd.data,
  categoryTreeIsFetching: state.categoryTreeList.categoryTreeIsFetching,
});

export default withStyles(styles)(connect(mapStateToProps)(CategoryAdd));
