import React, { useEffect } from 'react';
import { Switch, Route, useRouteMatch, useParams } from 'react-router-dom'
import './oder.scss'
import OderMain from './Features/OderMain/oder'
import ShopCart from './Features/ShopCart/ShopCart';
import { getAllProduct } from '../../APP/listFoodSlice';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { getDrinksAction } from '../../APP/listDrinks';
import { amount, dataoder, sumprice } from './cartSlide';
import { database } from '../../utils/firebase';
import { addKeyTable } from './Features/OderMain/oderSlice';

function Index(props) {
    const Match = useRouteMatch();
    const dispatch = useDispatch();
    const { keytable } = useParams()

    //handling getdata

    useEffect(() => {
        try {
            const actionGetAllFood = getAllProduct('food');
            const resultGetAllFood = dispatch(actionGetAllFood);
            unwrapResult(resultGetAllFood)
            const actionGetAllDrinks = getDrinksAction('drinks');
            const resultGetAllDrinks = dispatch(actionGetAllDrinks);
            unwrapResult(resultGetAllDrinks);

            const actionAddKeyTable = addKeyTable(keytable)
            dispatch(actionAddKeyTable);
        } catch (error) {
            console.error(error)
        }
    })

    //test real time
    useEffect(() => {

        // const nameRef = `Oder/-McEm9sL4p5yHByBiNpB/dataOder`
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
    })

    return (
        <>

            <div className='oder'>
                <Switch>
                    <Route exact path={`${Match.url}`} component={OderMain} />
                    <Route path={`${Match.url}/shopcart`} component={ShopCart} />
                </Switch>
            </div>
        </>
    );
}

export default Index;