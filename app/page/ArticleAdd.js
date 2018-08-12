import React from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField/TextField';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import {Tree} from '../components/Tree';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CommonUpload from '../components/CommonUpload';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button/Button';
import Editor from '../components/Editor';
import Done from '@material-ui/icons/Done';
import {getCategoryTree} from '../action/categoryList';
import {connect} from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress';
import SingleSelect from '../components/SingleSelect';
import {article_type_data} from '../util/data';
import {addArticle} from '../action/articleAddAction';

const skin_data = [
  {
    name: '粉红',
    id: 1
  }, {
    name: '骚紫',
    id: 2
  }, {
    name: '靓蓝',
    id: 3
  }
];

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
  category_id: null,
  ca_select_open: false,
  category_title: '',
  skin_id: -1,
  type_id: '',
  article: {
    'articleAuthor': '',
    'articleCategoryId': '',
    'articleContent': '',
    'articleCreateTime': '',
    'articleDesc': '',
    'articleHit': 0,
    'articleId': '',
    'articleInHomepage': '',
    'articleOrder': '',
    'articleReleaseStatus': '',
    'articleReleaseTime': '',
    'articleSiteId': '',
    'articleSkin': '',
    'articleStatus': 0,
    'articleThumb': '',
    'articleTitle': '',
    'articleType': '',
    'articleUpdateTime': '',
    'articleUrl': ''
  },
  all_files: {
    img: null,
    files: null
  }
};

class ArticleAdd extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    dispatch: PropTypes.func,
    ca_data: PropTypes.array,
    isAdding: PropTypes.bool
  };


  constructor(props) {
    super(props);
    this.state = initState;
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

  componentDidMount() {
    this.props.dispatch(getCategoryTree());
  }


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

  handleEditorContent(content) {
    this.setState(prevState => ({
      article: {
        ...prevState.article,
        articleContent: content
      }
    }));
  }

  handleAllFileUpload(item, file) {
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
  }

  handleSubmit() {
    const {article, all_files} = this.state;
    console.log(all_files);
    this.props.dispatch(addArticle({article, all_files}));
    this.setState(initState);
  }

  render() {
    const {classes, ca_data, isAdding} = this.props;
    const {ca_select_open, category_title, skin_id} = this.state;
    if (isAdding) {
      return <LinearProgress color="secondary"/>;
    }
    return (
      <Paper className={classes.root}>
        <div>
          <Typography variant='title'>
            撰写文章:
          </Typography>
          <TextField
            className={classes.text_field}
            autoFocus={true}
            label='文章标题'
            margin='normal'
            placeholder='请输入标题'
            required={true}
            onChange={this.handleChange('articleTitle')}
          />


          <TextField
            className={classes.text_field}
            label='自定义顺序'
            margin='normal'
            placeholder='请输入数字'
            onChange={this.handleChange('articleOrder')}
          />

          <SingleSelect
            item={'articleType'}
            suggestions={article_type_data}
            placeholder='请输入文章类型'
            onSelectValue={this.handleSelectValue.bind(this)}
          />

          <TextField
            className={classes.text_field}
            label='选择皮肤'
            margin='normal'
            placeholder='请输入皮肤名字'
            onChange={this.handleChange('articleSkin')}
          />

          <TextField
            className={classes.text_field}
            label='文章来源'
            margin='normal'
            placeholder='请输入文章来源'
            required={true}
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
            onClick={() => this.setState({ca_select_open: true})}
          >
          </TextField>
          <Dialog
            classes={
              {
                paper: classes.dialog_paper
              }
            }
            onClose={() => this.setState({ca_select_open: false})}
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


          {/*标签待添加*/}

          <TextField
            className={classes.text_field}
            label='文章描述'
            margin='normal'
            placeholder='请输入文章描述'
            required={true}
            onChange={this.handleChange('articleDesc')}
          />
        </div>


        <div style={{margin: '20px 0 20px 0'}}>
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
        />
        <Button
          style={{margin: '10px'}}
          color='primary'
          variant="contained"
          onClick={this.handleSubmit.bind(this)}
        >
          <Typography color="inherit" style={{paddingRight: '10px'}}>
            立即提交
          </Typography>
          <Done/>
        </Button>

        <Button
          style={{margin: '10px'}}
          color='primary'
          variant='contained'
        >
          <Typography color='inherit' style={{paddingRight: '10px'}}>
            重置
          </Typography>

        </Button>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.categoryTreeList.isFetching,
  ca_data: state.categoryTreeList.data.tree,
  isAdding: state.articleAdd.isAdding
});

export default withStyles(styles)(connect(mapStateToProps)(ArticleAdd));