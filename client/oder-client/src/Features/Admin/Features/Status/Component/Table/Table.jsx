import React from 'react';
import PropTypes from 'prop-types';
import './table.scss';

const colorStatus = {
    'Trống': 'green',
    'Đang oder': 'orange',
    'Sử dụng': 'red',
}

Table.propTypes = {
    nameTable: PropTypes.string,
    statusTable: PropTypes.string,
    numberPeple: PropTypes.number,
    numberFood: PropTypes.number,
    price: PropTypes.number,
    keyTable: PropTypes.string,
    onClickItem: PropTypes.func
};

Table.defaultProps = {
    nameTable: 'Bàn 1',
    statusTable: 'Trống',
    numberPeple: 0,
    numberFood: 0,
    price: 0
}

function Table(props) {
    const { nameTable, statusTable, numberPeple, numberFood, price, keyTable, onClickItem } = props;

    return (
        <div className='table' onClick={() => { onClickItem(keyTable) }}>
            <div className='table-title' >
                <div className='name' >
                    {nameTable}
                </div>
                <div className='status' >
                    {statusTable}
                    <div className={'led ' + colorStatus[statusTable]}></div>
                </div>
            </div>
            <div className='table-details'>
                <div className='details-left' >Số người:</div>
                <div className='details-right'> {numberPeple}</div>
                <div className='details-left'>Số món:</div>
                <div className='details-right'>{numberFood}</div>
                <div className='details-left'>Số tiền:</div>
                <div className='details-right'>{price}</div>
            </div>
        </div>
    );
}

export default Table;