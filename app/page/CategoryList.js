import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCategoryListData, getCategoryList } from '../action/categoryList';
import Table from '../components/Table';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import Button from '@material-ui/core/Button/Button';
import AddIcon from '@material-ui/icons/Add';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton/IconButton';

const styles = theme => ({
  root: {
    margin: '40px',
  },
  fab: {
    height: '50px',
    width: '50px',
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
    zIndex: theme.zIndex.mobileStepper,
  },
  tool_button: {
    margin: '3px',
  },
});

class CategoryList extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    header: PropTypes.arrayOf(
      PropTypes.shape({ title: PropTypes.string, field: PropTypes.string }),
    ),
    categoryList: PropTypes.arrayOf(PropTypes.object),
    count: PropTypes.number,
    dispatch: PropTypes.func,
    classes: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      limit: 10,
      orderBy: 'categoryId',
      order: 'asc',
      reFetching: false,
    };
  }

  rePage = (page, limit, order, orderBy) => {
    return fetchCategoryListData(page, limit, order, orderBy).then(v => v.categoryList);
  };

  toolGenFunc = v => (
    <div>
      <Button
        className={this.props.classes.tool_button}
        color="primary"
        variant={'contained'}
        component={Link}
        to={`/category_edit/${v['categoryId']}`}
      >
        <Typography>编辑</Typography>
      </Button>
      {v['categoryStatus'] === '审核中' && (
        <Button
          className={this.props.classes.tool_button}
          component={Link}
          variant={'contained'}
          color="secondary"
          to={`/category_check?id=${v['categoryId']}`}
        >
          <Typography>过审</Typography>
        </Button>
      )}
      {v['categoryStatus'] === '未通过' && (
        <Button
          className={this.props.classes.tool_button}
          component={Link}
          variant={'contained'}
          color="secondary"
          to={`/category_publish?id=${v['categoryId']}`}
        >
          <Typography>发布</Typography>
        </Button>
      )}
      {v['categoryStatus'] === '已通过' && (
        <Button
          className={this.props.classes.tool_button}
          component={Link}
          variant={'contained'}
          color="secondary"
          to={`/category_unPublish?id=${v['categoryId']}`}
        >
          <Typography>撤回</Typography>
        </Button>
      )}
    </div>
  );

  toolBar = (
    <Tooltip title="Add">
      <Button
        component={Link}
        to="/category_create"
        variant="fab"
        color="secondary"
        aria-label="Add"
      >
        <AddIcon />
      </Button>
    </Tooltip>
  );

  selectedToolBar = (
    <Tooltip title="Delete">
      <IconButton onClick={() => alert('可添加删除的回调')}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );

  componentDidMount() {
    const dispatch = this.props.dispatch;
    const { page, limit, order, orderBy } = this.state;
    dispatch(getCategoryList(page, limit, order, orderBy));
  }

  render() {
    const { isFetching, categoryList, header, classes } = this.props;
    if (isFetching) {
      return <LinearProgress color="secondary" />;
    }
    return (
      <div>
        <div className={classNames(classes.tool_set)} />
        <Paper className={classes.root}>
          {this.state.reFetching ? <LinearProgress color="secondary" /> : null}
          <Table
            id="categoryId"
            data={categoryList}
            header={header}
            orderBy={this.state.orderBy}
            count={this.props.count}
            rowsPerPage={this.state.limit}
            rowsPerPageOptions={[5, 10, 20]}
            title="栏目列表"
            pageCallback={this.rePage}
            pageBase={1}
            toolGen={this.toolGenFunc}
            toolBar={this.toolBar}
            selectedToolBar={this.selectedToolBar}
          />
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.categoryList.isFetching,
  categoryList: state.categoryList.data.categoryList,
  header: state.categoryList.data.header,
  count: state.categoryList.data.count,
});

export default withStyles(styles)(connect(mapStateToProps)(CategoryList));
