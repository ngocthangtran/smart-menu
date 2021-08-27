import React from 'react';
import PropTypes from 'prop-types';
import './table.scss';
import { shortenMoney } from '../../../../../../utils/convertPrice';

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
    price: 0,
    code:'null'
}

function Table(props) {
    const { nameTable, statusTable, numberPeple, numberFood, price, keyTable, onClickItem, code } = props;

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
                <div className='details-left'>Mã bàn:</div>
                <div className='details-right'>{code}</div>
                <div className='details-left'>Số tiền:</div>
                <div className='details-right'>{shortenMoney(price)}</div>
            </div>
        </div>
    );
}

export default Table;