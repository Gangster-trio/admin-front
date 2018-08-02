import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getArticleList } from '../action/articleList';
import Table from '../components/Table';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import Button from '@material-ui/core/Button/Button';
import AddIcon from '@material-ui/icons/Add';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    margin: '40px'
    // marginTop: theme.spacing.unit * 3
  },
  fab: {
    height: '50px',
    width: '50px'
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
  tool_set: {
    position: 'absolute',
    top: '15px',
    right: '15px'
  },
  'float_right': {
    float: 'right'
  }
});

class ArticleList extends React.Component {

  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    header: PropTypes.arrayOf(
      PropTypes.shape({title: PropTypes.string, field: PropTypes.string})
    ),
    articles: PropTypes.arrayOf(PropTypes.object),
    dispatch: PropTypes.func,
    classes: PropTypes.object,
  };

  componentDidMount () {
    const dispatch = this.props.dispatch;
    dispatch(getArticleList());
  }

  render () {
    const {isFetching, articles, header, classes} = this.props;

    if (isFetching) {
      return <LinearProgress color='secondary'/>;
    }
    return (
      <div>
        <div className={classNames(classes.tool_set)}>
          <Tooltip title="Add">
            <Button variant="fab" color="secondary" aria-label="Add" className={classes.fab}>
              <AddIcon/>
            </Button>
          </Tooltip>
        </div>
        <Paper className={classes.root}>
          <Table
            id="articleId"
            data={articles}
            header={header}
            orderBy="articleId"
            title="文章列表"
            clickCallback={v => {
              alert(v);
            }}/>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.articleList.isFetching,
  articles: state.articleList.data.articles,
  header: state.articleList.data.header
});

export default withStyles(styles)(connect(mapStateToProps)(ArticleList));
