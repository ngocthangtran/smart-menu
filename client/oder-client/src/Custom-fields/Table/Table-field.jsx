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

TableFields.propTypes = {
    size: PropTypes.number
};

TableFields.defaultProps = {
    size:500
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

    const {size} = props

    const formatNumber = (number) => Intl.NumberFormat().format(number)

    function createData(name, price, count, sumPrice) {
        return { name, price, count, sumPrice };
    }

    const rows = [
        createData('Dê hấp xả tía tô', formatNumber(150000), 2, formatNumber(300000)),
        createData('Dê hấp xả tía tô', formatNumber(150000), 2, formatNumber(300000)),
        createData('Dê hấp xả tía tô', formatNumber(150000), 2, formatNumber(300000)),
        createData('Dê hấp xả tía tô', formatNumber(150000), 2, formatNumber(300000)),
        createData('Dê hấp xả tía tô', formatNumber(150000), 2, formatNumber(300000)),
        createData('Dê hấp xả tía tô', formatNumber(150000), 2, formatNumber(300000)),
        createData('Dê hấp xả tía tô', formatNumber(150000), 2, formatNumber(300000)),
        createData('Dê hấp xả tía tô', formatNumber(150000), 2, formatNumber(300000)),
        createData('Dê hấp xả tía tô', formatNumber(150000), 2, formatNumber(300000)),
        createData('Dê hấp xả tía tô', formatNumber(150000), 2, formatNumber(300000)),
        createData('Dê hấp xả tía tô', formatNumber(150000), 2, formatNumber(300000)),
        createData('Dê hấp xả tía tô', formatNumber(150000), 2, formatNumber(300000)),
        createData('Dê hấp xả tía tô', formatNumber(150000), 2, formatNumber(300000)),
        createData('Dê hấp xả tía tô', formatNumber(150000), 2, formatNumber(300000)),
        createData('Dê hấp xả tía tô', formatNumber(150000), 2, formatNumber(300000)),
        createData('Dê hấp xả tía tô', formatNumber(150000), 2, formatNumber(300000)),
        createData('Dê hấp xả tía tô', formatNumber(150000), 2, formatNumber(300000)),
        createData('Dê hấp xả tía tô', formatNumber(150000), 2, formatNumber(300000)),
        createData('Dê hấp xả tía tô', formatNumber(150000), 2, formatNumber(300000)),
        createData('Dê hấp xả tía tô', formatNumber(150000), 2, formatNumber(300000)),
        createData('Dê hấp xả tía tô', formatNumber(150000), 2, formatNumber(300000)),
        createData('Dê hấp xả tía tô', formatNumber(150000), 2, formatNumber(300000)),
        createData('Dê hấp xả tía tô', formatNumber(150000), 2, formatNumber(300000)),
        createData('Dê hấp xả tía tô', formatNumber(150000), 2, formatNumber(300000)),
        createData('Dê hấp xả tía tô', formatNumber(150000), 2, formatNumber(300000)),
        createData('Dê hấp xả tía tô', formatNumber(150000), 2, formatNumber(300000)),

    ];

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
                        <StyledTableCell align="right">Số lượng&nbsp;(phần)</StyledTableCell>
                        <StyledTableCell align="right">Thành tiền&nbsp;(đ)</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name} >
                            <StyledTableCell component="th" scope="row" className={classes.rowStyle}>
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="right" className={classes.rowStyle}>{row.price}</StyledTableCell>
                            <StyledTableCell align="right" className={classes.rowStyle}>{row.count}</StyledTableCell>
                            <StyledTableCell align="right" className={classes.rowStyle}>{row.sumPrice}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableFields;