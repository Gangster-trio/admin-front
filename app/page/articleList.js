import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchArticlesData, getArticleList } from '../action/articleList';
import Table from '../components/Table';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import Button from '@material-ui/core/Button/Button';
import AddIcon from '@material-ui/icons/Add';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    margin: '40px'
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
    right: '15px',
    zIndex: theme.zIndex.modal
  },
});

class ArticleList extends React.Component {

  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    header: PropTypes.arrayOf(
      PropTypes.shape({title: PropTypes.string, field: PropTypes.string})
    ),
    articles: PropTypes.arrayOf(PropTypes.object),
    count: PropTypes.number,
    dispatch: PropTypes.func,
    classes: PropTypes.object,
  };

  constructor (props) {
    super(props);
    this.state = {
      page: 1,
      limit: 5,
      orderBy: 'articleId',
      order: 'asc',
      reFetching: false,
    };
  }

  rePage = (page, limit, order, orderBy) => {
    return fetchArticlesData(page, limit, order, orderBy).then(v => v.articles);
  };

  componentDidMount () {
    const dispatch = this.props.dispatch;
    const {page, limit, order, orderBy} = this.state;
    dispatch(getArticleList(page, limit, order, orderBy));
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
            <Link to="/article_create">
              <Button variant="fab" color="secondary" aria-label="Add" className={classes.fab}>
                <AddIcon/>
              </Button>
            </Link>
          </Tooltip>
        </div>
        <Paper className={classes.root}>
          {this.state.reFetching ? (<LinearProgress color='secondary'/>) : null}
          <Table
            id="articleId"
            data={articles}
            header={header}
            orderBy={this.state.orderBy}
            count={this.props.count}
            title="文章列表"
            clickCallback={v => {
              alert(v);
            }}
            pageCallback={this.rePage}
            pageBase={1}
          />
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.articleList.isFetching,
  articles: state.articleList.data.articles,
  header: state.articleList.data.header,
  count: state.articleList.data.count,
});

export default withStyles(styles)(connect(mapStateToProps)(ArticleList));
