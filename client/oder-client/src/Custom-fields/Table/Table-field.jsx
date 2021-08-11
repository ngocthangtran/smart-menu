import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { shortenMoney } from '../../utils/convertPrice';

TableFields.propTypes = {
    size: PropTypes.number,
    rows: PropTypes.array,
    clickRow: PropTypes.func
};

TableFields.defaultProps = {
    size: 500,
    rows: []
}

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: '1.25em'
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);




function TableFields(props) {

    const { size, rows, clickRow } = props;

    const useStyles = makeStyles({
        table: {
            minWidth: 700,
        },
        container: {
            maxHeight: size,
        },
        rowStyle: {
            fontSize: "1em"
        }
    });

    const classes = useStyles();

    return (
        <TableContainer component={Paper} className={classes.container}>
            <Table className={classes.table} stickyHeader aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Tên món</StyledTableCell>
                        <StyledTableCell align="right" >Đơn giá&nbsp;(đ)</StyledTableCell>
                        <StyledTableCell align="right">Số lượng&nbsp;</StyledTableCell>
                        <StyledTableCell align="right">Thành tiền&nbsp;(đ)</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <StyledTableRow key={index} onClick={() => { clickRow(row, index) }} >
                            <StyledTableCell component="th" scope="row" className={classes.rowStyle}>
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="right" className={classes.rowStyle}>{shortenMoney(row.price)}</StyledTableCell>
                            <StyledTableCell align="right" className={classes.rowStyle}>{`${row.count} (${row.unit})`}</StyledTableCell>
                            <StyledTableCell align="right" className={classes.rowStyle}>{shortenMoney(row.sumPrice)}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableFields;