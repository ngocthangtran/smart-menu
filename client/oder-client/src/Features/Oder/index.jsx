import React, { useEffect } from 'react';
import { Switch, Route, useRouteMatch, useParams, useHistory } from 'react-router-dom'
import './oder.scss'
import OderMain from './Features/OderMain/oder'
import ShopCart from './Features/ShopCart/ShopCart';
import { getAllProduct } from '../../APP/listFoodSlice';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { getDrinksAction } from '../../APP/listDrinks';
import { addDataTable, amount, dataoder, sumprice } from './cartSlide';
import { database } from '../../utils/firebase';
import { addKeyTable, addProductAction } from './Features/OderMain/oderSlice';
import { checkTableExits } from '../Admin/Features/Table/TableSlice';
import { ProcessDate } from '../../utils/Date';
import oderApi from './oderApi';
import Cookies from 'js-cookie';
import InputCode from './Features/OderMain/InputCodeTable/InputCode';
import { useState } from 'react';
import InputNumber from './Components/InputNumber/InputNumber';

function Index(props) {
    const Match = useRouteMatch();
    const history = useHistory();
    const dispatch = useDispatch();
    const { keytable } = useParams()
    const [cookieTable, setCookieTable] = useState(Cookies.get('table'));

    //check key table
    useEffect(async () => {
        var dataTable;//contains information name table, code table
        //processing keyTable on database: Tables/keyTable
        //if keyTable not exsit on database => user modify url conten. Must redirect user to 403
        const checkTableInTables = await checkTableExits({ keyTable: keytable });
        if (checkTableInTables.status !== 200) {
            history.push(`/authenticator`)
            return
        }
        //handling keyTable on databse: Tables/ketTable
        const checkTableInOder = await oderApi.checkTableExsitInOder({ keyTable: keytable })
        if (checkTableInOder.status === 200) {
            //da ton tai
            //handlink scurity oder ex: ramdom a key 3 
            if (cookieTable) {
                const dataCookie = JSON.parse(cookieTable)
                // console.log(cookieTable, checkTableInOder.data.code)

                if (checkTableInOder.data.code !== dataCookie.code) {
                    Cookies.set('table', JSON.stringify({
                        table: checkTableInTables.data.numberTable
                    }))
                    history.push(`${Match.url}/input-code`)
                } else {
                    history.push(`${Match.url}`)
                }
            } else {
                Cookies.set('table', JSON.stringify({
                    table: checkTableInTables.data.numberTable
                }))
                history.push(`${Match.url}/input-code`)
            }

            // console.log(cookieTable, checkTableInOder.data.code)
        }
        else {
            //chua ton tai
            const date = new Date();
            const day = ProcessDate.dayNow()
            const time = ProcessDate.timeNow()
            const code = Math.floor(1000 + Math.random() * 9000);
            const data = {
                date: day,
                keyTable: keytable,
                timeIn: time,
                code,
                numberTable: checkTableInTables.data.numberTable,
            }

            const params = {
                keyTable: keytable,
                data: data
            }
            dataTable = {
                table: checkTableInTables.data.numberTable,
                code
            }

            Cookies.set('table', JSON.stringify(dataTable));
            oderApi.addNewTable(params)
        }

        //handling getdata
        try {
            const actionGetAllFood = getAllProduct('food');
            const resultGetAllFood = dispatch(actionGetAllFood);
            unwrapResult(resultGetAllFood)
            const actionGetAllDrinks = getDrinksAction('drinks');
            const resultGetAllDrinks = dispatch(actionGetAllDrinks);

            unwrapResult(resultGetAllDrinks)

            const actionAddKeyTable = addKeyTable(keytable)
            dispatch(actionAddKeyTable);
        } catch (error) {
            console.error(error)
        }


    }, [cookieTable])

    useEffect(() => {
        //Processing realtime database
        const nameRef = `Oder/${keytable}/dataOder`
        database.ref(nameRef).on('value', (snapShort) => {
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
                    unwrapResult(dispatch(addDataoder))
                } catch (error) {
                    console.error(error)
                }
            } else {
                dispatch(sumprice(0))
                dispatch(amount(0))
                dispatch(dataoder({}))
            }
        })
    })

    //Processing input code 
    const getCode = async (value) => {
        if (value.length === 4) {
            const checkTableInOder = await oderApi.checkTableExsitInOder({ keyTable: keytable })
            if (checkTableInOder.data.code !== parseInt(value)) {
                return {
                    status: false,
                    message: "Mã bàn không đúng"
                }
            }
            const table = JSON.parse(Cookies.get('table'))
            const newCookie = {
                ...table,
                code: parseInt(value)
            }
            Cookies.set("table", JSON.stringify(newCookie))
            setCookieTable(Cookies.get('table'))

        }
        return true
    }

    const confirmOder = (value, dataOder) => {
        if (dataOder) {
            const params = {
                keyTable: keytable,
                data: {
                    numberPeople: parseInt(value)
                }
            }
            oderApi.addNewTable(params)
            history.goBack()
        }
    }

    return (
        <>

            <div className='oder'>
                <Switch>
                    <Route exact path={`${Match.url}`} component={OderMain} />
                    <Route path={`${Match.url}/shopcart`} component={ShopCart} />
                    <Route path={`${Match.url}/input-code`}>
                        <InputNumber getCode={getCode} message={'Bàn này đã đang được sử dụng! Lấy mã trong danh mục đồ ăn của người dùng đã vào được hệ thống'} hidden={true} />
                    </Route>
                    <Route path={`${Match.url}/input-people`}>
                        <InputNumber getCode={confirmOder} message={"Cho tôi biết số người trong bàn của bạn?"} hidden={false} />
                    </Route>
                </Switch>
            </div>
        </>
    );
}

export default Index;