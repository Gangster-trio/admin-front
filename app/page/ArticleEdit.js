import * as React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import { Tree } from "../components/Tree";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import CommonUpload from "../components/CommonUpload";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Editor from "../components/Editor";
import Button from "@material-ui/core/Button/Button";
import Done from "@material-ui/icons/Done";
import Cancel from "@material-ui/icons/Cancel";
import connect from "react-redux/es/connect/connect";
import { getSingleArticle } from "../action/articleEditAction";
import { applyMiddleware as dispatch } from "redux";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";


const ca_data = [
  {
    title: "一级栏目1",
    id: "1",
    child: [
      {
        title: "二级栏目1",
        id: "2"
      },
      {
        title: "二级栏目2",
        id: "3",
        child: [{
          title: "三级栏目1",
          id: "4"
        }, {
          title: "三级栏目2",
          id: "5"
        }]
      }
    ]
  }, {
    title: "一级栏目_2",
    id: "6"
  }
];
const article_type_data = [
  {
    name: "主页文章",
    id: 1
  }, {
    name: "轮播图",
    id: 2
  }, {
    name: "普通文章",
    id: 3
  }
];

const skin_data = [
  {
    name: "粉红",
    id: 1
  }, {
    name: "骚紫",
    id: 2
  }, {
    name: "靓蓝",
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
      margin: "10px",
      minWidth: "200px"
    },
    dialog_paper: {
      minWidth: "300px"
    }
  })
;


class ArticleEdit extends React.Component {

  static propTypes = {
    articleId: PropTypes.string,
    classes: PropTypes.object,
    dispatch: PropTypes.func,
    article: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      ca_select_open: false,
      category_id: null,
      category_title: "",
      skin_id: -1,
      type_id: -1
    };
  }


  componentDidMount() {

    const articleId = parseInt(this.props.match.params.id);
    dispatch(getSingleArticle(articleId));
    const { article } = this.props;
    // const article_type_id = article_type_data.findIndex(e => e.name === article.articleType);
    this.setState({
      article
    });
  }

  handleEditorContent(content) {
    this.setState(prevState => ({
      article: {
        ...prevState.article,
        "articleContent": content
      }
    }));
  }

  handleImgUpload(param) {
    console.log(param);
  }


  handleChange = name => (event) => {
    const value = event.target.value;
    this.setState(prevState => ({
      article: {
        ...prevState.article,
        [name]: value
      }
    }));
    console.log(this.state.article);
  };

  onSelectCa = (data) => {
    this.setState({
      category_id: data.id,
      category_title: data.title,
      ca_select_open: false
    });
  };


  render() {

    const { classes, article, isFetching } = this.props;
    const { ca_select_open, skin_id, category_title, type_id } = this.state;
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
            margin='normal'
            placeholder='请输入标题'
            required={true}
            value={article.articleTitle}
            onChange={this.handleChange("articleTitle")}
          />

          <TextField
            className={classes.text_field}
            label='自定义顺序'
            margin='normal'
            placeholder='请输入数字'
            value={article.articleOrder}
            onChange={this.handleChange("articleOrder")}
          />
          {/*

          <TextField
            className={classes.text_field}
            label='文章类型'
            margin='normal'
            placeholder='请输入文章类型'
            required={true}
            value={article.articleType}
            onChange={this.handleChange("articleType")}
          />
*/}


          {/*      this.setState(prevState => ({
          article: {
          ...prevState.article,
          [name]: value
        }
        }));*/}
          <TextField
            className={classes.text_field}
            label='文章类型选择'
            margin='normal'
            select
            value={type_id}
            onChange={e => {
              this.setState(prevState => ({
                type_id: e.target.value,
                article: {
                  ...prevState.article,
                  articleType: article_type_data[e.target.value]
                }
              }));
            }
            }
          >
            {article_type_data.map(v => (
              <MenuItem key={v.id} value={v.id}>
                {v.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            className={classes.text_field}
            label='选择皮肤'
            margin='normal'
            placeholder='请输入皮肤名字'
            value={article.articleSkin}
            onChange={this.handleChange("articleSkin")}
          />


        </div>

        <div>
          <TextField
            className={classes.text_field}
            label='文章来源'
            margin='normal'
            placeholder='请输入文章来源'
            required={true}
            value={article.articleAuthor}
            onChange={this.handleChange("articleAuthor")}
          />
          <TextField
            className={classes.text_field}
            label='栏目选择'
            margin='normal'
            placeholder='点击选择栏目'
            required={true}
            helperText='Click to select category'
            value={category_title}
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
            <Tree data={ca_data} onSelect={this.onSelectCa}/>
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
            onChange={this.handleChange("articleDesc")}
          />
        </div>

        <div style={{ margin: "20px 0 20px 0" }}>
          <CommonUpload
            buttonName={"主图上传"}
            color={"primary"}
            callback={(f) => alert("已选择:" + f[0].name)}
            icon={<CloudUploadIcon/>}
          />
          <CommonUpload
            buttonName={"附件上传"}
            color={"primary"}
            multiple={true}
            callback={(fs) => Array.from(fs).map(f => (alert("已选择:" + f.name)))}
            icon={<CloudUploadIcon/>}
          />
        </div>

        <Editor
          handleEditorContent={this.handleEditorContent.bind(this)}
          handleImgUpload={this.handleImgUpload}
        />


        <Button
          style={{ margin: "10px" }}
          color='primary'
          variant="contained"
        >
          <Typography color="inherit" style={{ paddingRight: "10px" }}>
            立即提交
          </Typography>
          <Done/>
        </Button>

        <Button
          style={{ margin: "10px" }}
          color='primary'
          variant="contained"
        >
          <Typography color="inherit" style={{ paddingRight: "10px" }}>
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
  article: state.articleEdit.data
});


export default withStyles(styles)(connect(mapStateToProps)(ArticleEdit));