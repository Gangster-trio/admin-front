import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import { Tree } from '../components/Tree';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import CommonUpload from '../components/CommonUpload';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Editor from '../components/Editor';
import Button from '@material-ui/core/Button/Button';
import Done from '@material-ui/icons/Done';
import Cancel from '@material-ui/icons/Cancel';
import connect from 'react-redux/es/connect/connect';
import { ARTICLE_INDEX, article_type_data, skin_data } from '../util/data';
import SingleSelect, { UPDATE_OPERATION } from '../components/SingleSelect';
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress';
import { fetchUpdateArticleInfo, updateArticle } from '../action/articleEditAction';
import Dialogs from '../components/Dialogs';
import CustomizedSnackbars from '../components/Snackbars';

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      margin: theme.spacing.unit * 5,
      padding: theme.spacing.unit * 5
    },
    text_field: {
      margin: '10px',
      minWidth: '200px'
    },
    dialog_paper: {
      minWidth: '300px'
    }
  })
;

const initState = {
  ca_select_open: false,
  category_id: null,
  old_category: null,
  category_title: '',
  skin_id: -1,
  type_id: -1,
  article: null,
  category: null,
  all_files: {
    img: null,
    files: null
  },
  isFetching: true,
  isSubmitting: false,
  updateSuccess: undefined    // 设置文章是否上传成功,没有上传，就为undefined
};

class ArticleEdit extends React.Component {

  static propTypes = {
    articleId: PropTypes.string,
    classes: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    isUpdating: PropTypes.bool.isRequired,
    article: PropTypes.object,
    ca_data: PropTypes.array,
    category: PropTypes.object,
    callbackMessage: PropTypes.object
  };


  constructor(props) {
    super(props);
    this.state = initState;
  }

  componentDidMount() {
    const articleId = this.props.match.params.id;
    this.props.dispatch(fetchUpdateArticleInfo(articleId));

  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      article: nextProps.article,
      isFetching: nextProps.isFetching,
      category_title: nextProps.category.categoryTitle
    });
  }

  componentWillUnmount() {
    this.setState = initState;
  }

  onSelectCa = (data) => {
    this.setState(prevState => ({
      category_id: data.categoryId,
      category_title: data.categoryTitle,
      ca_select_open: false,
      article: {
        ...prevState.article,
        articleCategoryId: data.categoryId
      }
    }));
  };


  handleChange = name => (event) => {
    const value = event.target.value;
    this.setState(prevState => ({
      article: {
        ...prevState.article,
        [name]: value
      }
    }));
  };


  handleSelectValue = (item, value) => {
    this.setState(prevState => ({
      article: {
        ...prevState.article,
        [item]: value
      }
    }));
  };


  handleEditorContent = content => {
    this.setState(prevState => ({
      article: {
        ...prevState.article,
        articleContent: content
      }
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
          [item]: file
        }
      }));
    }
  };

  handleValid = () => {
    const { article } = this.state;
    this.setState({
      isSubmitting: true    // 将当前状态修改为正在提交状态，用来验证输入的有效性
    });
    return !!(article.articleTitle && article.articleAuthor && article.articleCategoryId && article.articleType);
  };

  async handleArticleSubmit() {
    const { article, all_files } = this.state;
    const { dispatch } = this.props;
    if (this.handleValid()) {
      await dispatch(updateArticle({ article, all_files }));
      const { callbackMessage } = this.props;
      let status;
      callbackMessage.code === 200 ? status = 'success' : status = 'failed';
      this.setState({
        updateSuccess: status
      });
      this.child.handleClick();
    } else {
      alert('请填写必要的字段信息');
    }
  }

  render() {
    const { classes, ca_data } = this.props;
    const { ca_select_open, skin_id, category_title, article, isSubmitting, isFetching, updateSuccess } = this.state;
    if (isFetching) {
      return <LinearProgress color="secondary"/>;
    }
    return (
      <Paper className={classes.root}>
        <div>
          <Typography variant='title'>
            更新文章:
          </Typography>
          <TextField
            id="title"
            className={classes.text_field}
            autoFocus={true}
            label='文章标题'
            error={isSubmitting && !article.articleTitle}
            margin='normal'
            placeholder='请输入标题'
            required={true}
            value={article.articleTitle}
            onChange={this.handleChange('articleTitle')}
          />

          <TextField
            className={classes.text_field}
            label='自定义顺序'
            margin='normal'
            placeholder='请输入数字'
            type='number'
            value={article.articleOrder}
            onChange={this.handleChange('articleOrder')}
          />

          <SingleSelect
            item={'articleType'}
            suggestions={article_type_data}
            initValue={article.articleType}
            placeholder='请输入文章类型'
            operation={UPDATE_OPERATION}
            onSelectValue={this.handleSelectValue.bind(this)}
          />

          <TextField
            className={classes.text_field}
            label='选择皮肤'
            margin='normal'
            placeholder='请输入皮肤名字'
            value={article.articleSkin}
            onChange={this.handleChange('articleSkin')}
          />

          <TextField
            className={classes.text_field}
            label='文章来源'
            margin='normal'
            placeholder='请输入文章来源'
            value={article.articleAuthor}
            required={true}
            error={isSubmitting && !article.articleAuthor}
            onChange={this.handleChange('articleAuthor')}
          />

        </div>

        <div>

          <TextField
            className={classes.text_field}
            label='栏目选择'
            margin='normal'
            placeholder='点击选择栏目'
            required={true}
            helperText='Click to select category'
            value={category_title}
            error={isSubmitting && !article.articleCategoryId}
            onClick={() => this.setState({ ca_select_open: true })}
          >
          </TextField>

          <Dialog
            classes={
              {
                paper: classes.dialog_paper
              }
            }
            onClose={() => this.setState({ ca_select_open: false })}
            open={ca_select_open}>
            <DialogTitle>选择栏目</DialogTitle>
            <Tree data={ca_data} onSelect={this.onSelectCa} title="categoryTitle"/>
          </Dialog>

          <TextField
            className={classes.text_field}
            label='样式选择'
            margin='normal'
            select
            onChange={e => {
              this.setState(
                {
                  skin_id: e.target.value,
                  skin_name: skin_data[e.target.value]
                }
              );
            }}
            value={skin_id}
          >
            {skin_data.map(v => (
              <MenuItem key={v.id} value={v.id}>
                {v.name}
              </MenuItem>
            ))}
          </TextField>


          <TextField
            className={classes.text_field}
            label='文章描述'
            margin='normal'
            placeholder='请输入文章描述'
            required={true}
            value={article.articleDesc}
            onChange={this.handleChange('articleDesc')}
          />
        </div>

        <div style={{ margin: '20px 0 20px 0' }}>
          <CommonUpload
            buttonName={'主图上传'}
            color={'primary'}
            file_type='img'
            callback={this.handleAllFileUpload.bind(this)}
            icon={<CloudUploadIcon/>}
          />
          <CommonUpload
            buttonName={'附件上传'}
            color={'primary'}
            multiple={true}
            file_type='files'
            callback={this.handleAllFileUpload.bind(this)}
            icon={<CloudUploadIcon/>}
          />
        </div>

        <Editor
          handleEditorContent={this.handleEditorContent.bind(this)}
          initialContent={article.articleContent}/>

        <Dialogs
          ref={instance => {
            this.child = instance;
          }}
          title={'From Gangster Cms Message'}
          contentText={`确定修改文章标题为: ${article.articleTitle}的文章?`}
          onEventSubmit={this.handleArticleSubmit.bind(this)}/>

        {
          updateSuccess !== undefined ?
            <CustomizedSnackbars
              ref={instance => {
                this.child = instance;
              }}
              variant={updateSuccess}
              message={updateSuccess ? '更新成功' : '更新失败'}
              redirect={ARTICLE_INDEX}
            />
            :
            null
        }

        <Button
          style={{ margin: '10px' }}
          color='primary'
          variant="contained"
          onClick={() => {
            this.child.handleClickOpen();
          }}
        >
          <Typography color="inherit" style={{ paddingRight: '10px' }}>
            立即提交
          </Typography>
          <Done/>
        </Button>

        <Button
          style={{ margin: '10px' }}
          color='primary'
          variant="contained"
        >
          <Typography color="inherit" style={{ paddingRight: '10px' }}>
            重置
          </Typography>
          <Cancel/>
        </Button>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
    isFetching: state.articleEdit.isFetching,
    isUpdating: state.articleEdit.isUpdating,
    ca_data: state.articleEdit.data.categoryTree,
    article: state.articleEdit.data.article,
    category: state.articleEdit.data.category,
    callbackMessage: state.articleEdit.callbackMessage
  })
;

export default withStyles(styles)(connect(mapStateToProps)(ArticleEdit));