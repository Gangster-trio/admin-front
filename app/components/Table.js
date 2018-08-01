import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import {lighten} from '@material-ui/core/styles/colorManipulator';

function getSorting(order, orderBy) {
    return (a, b) => {
        if (a[orderBy] > b[orderBy]) {
            return order === 'desc' ? -1 : 1;
        } else if (a[orderBy] < b[orderBy]) {
            return order === 'desc' ? 1 : -1;
        } else
            return 0;
    };
}

class EnhancedTableHead extends React.Component {

    static propTypes = {
        header: PropTypes.arrayOf(PropTypes.shape({title: PropTypes.string, field: PropTypes.string})).isRequired,
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.string.isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
    };

    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const {onSelectAllClick, order, orderBy, numSelected, rowCount, header} = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {header.map((header, i) => {
                        return (
                            <TableCell
                                key={i}
                                sortDirection={orderBy === (header.field) ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    enterDelay={300}
                                >
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
    const {numSelected, classes} = props;

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
                    <Typography variant="title" id="tableTitle">
                        {props.title}
                    </Typography>
                )}
            </div>
            <div className={classes.spacer}/>
            <div className={classes.actions}>
                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton aria-label="Delete">
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Filter list">
                        <IconButton aria-label="Filter list">
                            <FilterListIcon/>
                        </IconButton>
                    </Tooltip>
                )}
            </div>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object,
    numSelected: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class EnhancedTable extends React.Component {

    static propTypes = {
        classes: PropTypes.object.isRequired,
        title: PropTypes.string,
        header: PropTypes.arrayOf(PropTypes.shape({title: PropTypes.string, field: PropTypes.string})),
        id: PropTypes.string.isRequired,
        data: PropTypes.arrayOf(PropTypes.object).isRequired,
        orderBy: PropTypes.string,
        clickCallback: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            order: 'asc',
            orderBy: props.orderBy,
            selected: [],
            //todo: 测试数据
            data: props.data,
            page: 0,
            rowsPerPage: 5,
        };
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({order, orderBy});
    };

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState(state => ({selected: state.data.map(n => n[this.props.id])}));
            return;
        }
        this.setState({selected: []});
    };

    removeSelected = (val) => {
        let selected = this.state.selected;
        let index = selected.indexOf(val);
        if (index > -1) {
            selected.splice(index, 1);
            this.setState({'selected': selected});
        }
    };

    addSelected = (val) => {
        let selected = this.state.selected;
        selected.push(val);
        this.setState({'selected': selected})
    };

    handleClick = (event, id) => {
        const {selected} = this.state;
        const isSelected = selected.includes(id);

        if (isSelected) {
            this.removeSelected(id);
        } else {
            this.addSelected(id);
        }
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    //todo
    isSelected = id => this.state.selected.includes(id);

    render() {
        const {classes, title, id, header} = this.props;
        const {data, order, orderBy, selected, rowsPerPage, page} = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar numSelected={selected.length} title={title}/>
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
                            header={header}/>
                        <TableBody>
                            {data
                                .sort(getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((n, i) => {
                                    const isSelected = this.isSelected(n[id]);
                                    return (
                                        <TableRow
                                            hover
                                            onClick={() => this.props.clickCallback(n[id])}
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n[id]}
                                            selected={isSelected}
                                        >
                                            <TableCell key={n[id] + '_check'}
                                                       padding="checkbox"
                                                       onClick={event => {
                                                           event.stopPropagation();
                                                           return this.handleClick(event, n[this.props.id])
                                                       }}
                                            >
                                                <Checkbox checked={isSelected}/>
                                            </TableCell>
                                            {this.props.header.map((h, i) => {
                                                return (
                                                    <TableCell key={n[id] + "_" + i}>{n[h.field]}</TableCell>
                                                )
                                            })}
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{height: 49 * emptyRows}}>
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
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
            </Paper>
        );
    }
}

export default withStyles(styles)(EnhancedTable);
