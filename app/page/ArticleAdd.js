import React from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField/TextField';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import { Tree } from '../components/Tree';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CommonUpload from '../components/CommonUpload';
import withStyles from '@material-ui/core/styles/withStyles';

const ca_data = [
  {
    title: '一级栏目1',
    id: '1',
    child: [
      {
        title: '二级栏目1',
        id: '2',
      },
      {
        title: '二级栏目2',
        id: '3',
        child: [{
          title: '三级栏目1',
          id: '4',
        }, {
          title: '三级栏目2',
          id: '5',
        }]
      }
    ]
  }, {
    title: '一级栏目_2',
    id: '6',
  }
];

const skin_data = [
  {
    name: '粉红',
    id: 1,
  }, {
    name: '骚紫',
    id: 2,
  }, {
    name: '靓蓝',
    id: 3,
  }
];

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      margin: theme.spacing.unit * 5,
      padding: theme.spacing.unit * 5,
    },
    text_field: {
      margin: '10px',
      minWidth: '200px'
    },
    dialog_paper: {
      minWidth: '300px',
    }
  })
;

class ArticleAdd extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
  };

  constructor (props) {
    super(props);
    this.state = {
      ca_select_open: false,
      category_title: '',
      skin_id: -1,
    };
  }

  onSelectCa = (data) => {
    this.setState({
      category_id: data.id,
      category_title: data.title,
      ca_select_open: false,
    });
  };

  render () {
    const {classes} = this.props;
    const {ca_select_open, category_title, skin_id,} = this.state;

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
            placeholder='请输入文章标题'
            required={true}
          />
          <TextField
            className={classes.text_field}
            label='文章来源'
            margin='normal'
            placeholder='请输入文章来源'
            required={true}
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
                paper: classes.dialog_paper,
              }
            }
            onClose={() => this.setState({ca_select_open: false})}
            open={ca_select_open}>
            <DialogTitle>选择栏目</DialogTitle>
            <Tree data={ca_data} onSelect={this.onSelectCa}/>
          </Dialog>
          <TextField
            className={classes.text_field}
            label='样式选择'
            margin='normal'
            // required={true}
            select
            onChange={e => {
              this.setState(
                {
                  skin_id: e.target.value,
                  skin_name: skin_data[e.target.value],
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
        </div>
        <div style={{margin: '20px 0 20px 0'}}>
          <CommonUpload
            buttonName={'主图上传'}
            color={'primary'}
            callback={(f) => alert('已选择:' + f[0].name)}
            icon={<CloudUploadIcon/>}
          />
          <CommonUpload
            buttonName={'附件上传'}
            color={'primary'}
            multiple={true}
            callback={(fs) => Array.from(fs).map(f => (alert('已选择:' + f.name)))}
            icon={<CloudUploadIcon/>}
          />
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(ArticleAdd);