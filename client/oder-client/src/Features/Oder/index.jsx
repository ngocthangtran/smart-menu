import React, { useEffect, useState } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import './oder.scss'
import OderMain from './Features/OderMain/oder'
import ShopCart from './Features/ShopCart/ShopCart';
import { getAllProduct } from '../../APP/listFoodSlice';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { getDrinksAction } from '../../APP/listDrinks';

function Index(props) {
    const Match = useRouteMatch();
    const dispatch = useDispatch();

    //handling getdata

    useEffect(() => {
        try {
            const actionGetAllFood = getAllProduct('food');
            const resultGetAllFood = dispatch(actionGetAllFood);
            unwrapResult(resultGetAllFood)
            const actionGetAllDrinks = getDrinksAction('drinks');
            const resultGetAllDrinks = dispatch(actionGetAllDrinks);
            unwrapResult(resultGetAllDrinks);
        } catch (error) {
            console.error(error)
        }
    })

    return (
        <>

            <div className='oder'>
                <Switch>
                    <Route exact path={Match.url} component={OderMain} />
                    <Route path={`${Match.url}/shopcart`} component={ShopCart} />
                </Switch>
            </div>
        </>
    );
}

export default Index;