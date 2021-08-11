import React from 'react';
import PropTypes from 'prop-types';
import MainHeader from '../../../Components/MainHeader/MainHeader'
import TableFields from '../../../../../Custom-fields/Table/Table-field';
import FormChange from './FormChange';
import './viewtable.scss'
import Button from '@material-ui/core/Button';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { database } from '../../../../../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { amount, dataoder, sumprice } from '../../../../Oder/cartSlide';
import { fixNumberFloat, shortenMoney } from '../../../../../utils/convertPrice';
import { useState } from 'react';
import { TableApi } from '../TableApi';
const refOder = process.env.REACT_APP_NAME_REF_ODER
ViewATable.propTypes = {

};

function createData(name, price, count, sumPrice, unit) {
    return { name, price, count, sumPrice, unit };
}

function ViewATable(props) {
    const { keytable } = useParams()
    const dispatch = useDispatch()
    const { dataOder, sumPrice } = useSelector(state => state.cartreducer)
    const [rows, setRows] = useState([]);
    const [table, setTable] = useState(1);

    useEffect(async () => {
        const { data } = await TableApi.checkTableExits({ keyTable: keytable });
        setTable(data.numberTable);
    }, [])

    //get realtime database oder with desk
    useEffect(() => {
        database.ref(`${refOder}/${keytable}/dataOder`).on('value', snapShort => {
            if (snapShort.val()) {
                try {
                    const amountProduct = Object.keys(snapShort.val()).length;
                    const addAmountAction = amount(amountProduct)
                    const addDataoder = dataoder(snapShort.val());
                    var sumPrice = 0;
                    Object.keys(snapShort.val()).map(item => {
                        const { amount: amountProduct, selectPrice } = snapShort.val()[item];
                        const { amount: amountForUnit, oderOption } = amountProduct

                        if (oderOption) {
                            sumPrice += selectPrice * amountForUnit * oderOption.factor
                        } else {
                            sumPrice += selectPrice * amountProduct.amount
                        }
                        return 1
                    })
                    dispatch(sumprice(sumPrice))
                    dispatch(addAmountAction)
                    dispatch(addDataoder)
                } catch (error) {
                    console.error(error)
                }
            } else {
                dispatch(sumprice(0))
                dispatch(amount(0))
                dispatch(dataoder({}))
            }
        })
    }, [])

    //set rows for table
    useEffect(() => {
        const newRos = [];
        if (dataOder) {
            Object.keys(dataOder).map(item => {
                const { name, selectPrice, unit, amount } = dataOder[item];
                let count, sumPrice;
                if (amount.oderOption) {
                    count = fixNumberFloat(amount.amount * amount.oderOption.factor)
                } else {
                    count = amount.amount
                }
                sumPrice = selectPrice * count
                newRos.push(createData(name, selectPrice, count, sumPrice, unit))
            })
            setRows(newRos)
        }
    }, [dataOder])

    //handling click row
    const [selectRow, setSelectRow] = useState()
    const clickRow = (data, index) => {
        setSelectRow({
            index: index,
            dataRow: data
        })
    }

    //handlink changeValue select row
    const changeValue = (values) => {

    }

    return (
        <>
            <MainHeader name={`Bàn số: ${table}`} />
            <div className='conten'>
                <div className='table__details'>
                    <TableFields
                        size={400}
                        rows={rows}
                        clickRow={clickRow}
                    />
                </div>
                {
                    selectRow &&
                    <FormChange
                        name={selectRow.dataRow.name}
                        price={selectRow.dataRow.price}
                        count={selectRow.dataRow.count}
                        sumPrice={selectRow.dataRow.sumPrice}
                        unit={selectRow.dataRow.unit}

                        changeValue={changeValue}
                    />
                }
                <div className='foodter-table'>
                    Tổng tiền: {shortenMoney(sumPrice)}
                    <Button
                        variant="contained"
                        color="secondary"
                        endIcon={< DoneAllIcon />}
                        style={{
                            height: '4rem'
                        }}
                    >
                        Xác nhận<br />
                        Đã nhận tiền
                    </Button>
                </div>
            </div>
        </>
    );
}

export default ViewATable;