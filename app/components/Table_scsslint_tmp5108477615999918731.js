import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress';

class EnhancedTableHead extends React.Component {
  static propTypes = {
    header: PropTypes.arrayOf(PropTypes.shape({ title: PropTypes.string, field: PropTypes.string }))
      .isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  };

  headerCellStyle = {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    padding: 0,
  };

  createSortHandler = property => event => this.props.onRequestSort(event, property);

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, header } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox" style={{ width: '1px' }}>
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {header.map((header, i) => {
            return (
              <TableCell
                style={this.headerCellStyle}
                key={i}
                sortDirection={orderBy === header.field ? order : false}
              >
                <Tooltip title="Sort" enterDelay={300}>
                  <TableSortLabel
                    active={orderBy === header.field}
                    direction={order}
                    onClick={this.createSortHandler(header.field)}
                  >
                    {header.title}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
          <TableCell style={this.headerCellStyle}>
            <Tooltip title="操作" enterDelay={300}>
              <Typography>操作</Typography>
            </Tooltip>
          </TableCell>
        </TableRow>
      </TableHead>
    );
  }
}

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {numSelected} 已选中
          </Typography>
        ) : (
          <Typography variant="title" id="tableTitle" color="inherit">
            {props.title}
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <div style={{ display: 'flex' }}>
            {props.selectedToolBar}
            {/*<Tooltip title="Delete">*/}
            {/*<IconButton aria-label="Delete">*/}
            {/*<DeleteIcon/>*/}
            {/*</IconButton>*/}
            {/*</Tooltip>*/}
            {/*<IconButton>*/}
            {/*<DeleteIcon/>*/}
            {/*</IconButton>*/}
          </div>
        ) : (
          <div style={{ display: 'flex' }}>{props.toolBar}</div>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object,
  numSelected: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  toolBar: PropTypes.object,
  selectedToolBar: PropTypes.object,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = () => ({
  table: {
    tableLayout: 'fixed',
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  data_cell: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textAlign: 'center',
  },
  op_cell: {
    textAlign: 'center',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

class EnhancedTable extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    //表格标题
    title: PropTypes.string.isRequired,
    //表头
    header: PropTypes.arrayOf(PropTypes.shape({ title: PropTypes.string, field: PropTypes.string }))
      .isRequired,
    //标识符,如"articleId"
    id: PropTypes.string.isRequired,
    //
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    //初始排序依据
    orderBy: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    //页数从0开始还是从1开始
    pageBase: PropTypes.oneOf([0, 1]).isRequired,
    //默认每页条目数
    rowsPerPage: PropTypes.number,
    //每页条目数可选项
    rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
    //点击条目后的回调函数
    //传入被点击条目的id
    clickCallback: PropTypes.func,
    //分页函数,要求返回一个返回data的Promise对象
    //args(page,limit,order,orderBy)
    pageCallback: PropTypes.func.isRequired,
    //表格工具栏生成函数,传入的是对应列的数据
    toolGen: PropTypes.func.isRequired,
    //表格上部工具栏
    toolBar: PropTypes.object,
    //表格内容被选中时出现的工具栏
    selectedToolBar: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      order: 'asc',
      orderBy: props.orderBy,
      selected: [],
      data: props.data,
      page: 0,
      rowsPerPage: props.rowsPerPage,
      count: props.count,
      loading: false,
    };
  }

  static defaultProps = {
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 20],
  };

  handleRequestSort = (event, property) => {
    const { page, rowsPerPage } = this.state;

    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ loading: true });
    this.props.pageCallback(page, rowsPerPage, order, orderBy).then(v => {
      this.setState({
        data: v,
        order: order,
        orderBy: orderBy,
        loading: false,
      });
    });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState(state => ({
        selected: state.data.map(n => n[this.props.id]),
      }));
      return;
    }
    this.setState({ selected: [] });
  };

  removeSelected = val => {
    const selected = this.state.selected;
    const index = selected.indexOf(val);
    if (index > -1) {
      selected.splice(index, 1);
      this.setState({ selected });
    }
  };

  addSelected = val => {
    const selected = this.state.selected;
    selected.push(val);
    this.setState({ selected });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const isSelected = selected.includes(id);

    if (isSelected) {
      this.removeSelected(id);
    } else {
      this.addSelected(id);
    }
  };

  handleChangePage = (event, page) => {
    const { rowsPerPage, order, orderBy } = this.state;
    this.setState({ loading: true });
    this.props.pageCallback(page + this.props.pageBase, rowsPerPage, order, orderBy).then(v => {
      this.setState({
        data: v,
        page: page,
        loading: false,
      });
    });
  };

  handleChangeRowsPerPage = event => {
    const limit = event.target.value;
    const { page, order, orderBy } = this.state;
    if (page * limit > this.props.count) {
      this.setState({
        data: [],
      });
      return;
    }
    this.setState({ loading: true });
    this.props.pageCallback(page + this.props.pageBase, limit, order, orderBy).then(v => {
      this.setState({
        data: v,
        page: page,
        rowsPerPage: limit,
        loading: false,
      });
    });
  };

  isSelected = id => this.state.selected.includes(id);

  render() {
    const {
      classes,
      title,
      id,
      header,
      toolGen,
      rowsPerPageOptions,
      toolBar,
      selectedToolBar,
    } = this.props;
    const { data, count, order, orderBy, selected, rowsPerPage, page, loading } = this.state;

    return (
      <div>
        {loading && <LinearProgress />}
        <EnhancedTableToolbar
          numSelected={selected.length}
          title={title}
          toolBar={toolBar}
          selectedToolBar={selectedToolBar}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
              id={id}
              header={header}
            />
            <TableBody>
              {data.map(n => {
                const isSelected = this.isSelected(n[id]);
                return (
                  <TableRow
                    hover
                    onClick={() => {
                      if (this.props.clickCallback !== undefined) this.props.clickCallback(n[id]);
                    }}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n[id]}
                    selected={isSelected}
                  >
                    {/*选框cell*/}
                    <TableCell
                      key={`${n[id]}_check`}
                      style={{ width: '0px' }}
                      padding="checkbox"
                      onClick={event => {
                        event.stopPropagation();
                        return this.handleClick(event, n[this.props.id]);
                      }}
                    >
                      <Checkbox checked={isSelected} />
                    </TableCell>
                    {/*数据cell*/}
                    {header.map((h, i) => {
                      return (
                        <TableCell
                          className={classes.data_cell}
                          padding="dense"
                          key={`${n[id]}_${i}`}
                        >
                          {n[h.field]}
                        </TableCell>
                      );
                    })}
                    {/*工具栏*/}
                    <TableCell
                      className={classes.op_cell}
                      onClick={e => {
                        e.stopPropagation();
                      }}
                    >
                      {toolGen(n)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </div>
    );
  }
}

export default withStyles(styles)(EnhancedTable);
