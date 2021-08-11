import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { database } from '../../../../utils/firebase';
import MainHeader from '../../Components/MainHeader/MainHeader';
import ListTable from './Component/ListTable/ListTable';
import Statistic from './Component/Statistic/Statistic';
import './index.scss';
import { getAllTableAction, setTableOder } from './statusSlice';
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import ViewATable from '../Table/ViewATable/ViewATable';

const oderRef = process.env.REACT_APP_NAME_REF_ODER

function Index(props) {
    const dispatch = useDispatch();
    const Match = useRouteMatch();

    useEffect(async () => {
        const allDeskAction = getAllTableAction();
        const result = unwrapResult(await dispatch(allDeskAction))
        database.ref(oderRef).on('value', snapShort => {
            if (snapShort.val()) {
                dispatch(setTableOder(snapShort.val()))
            } else {
                dispatch(setTableOder({}))
            }
        })
    })
    return (
        <>

            <Switch>
                <Route exact path={Match.url}>
                    <MainHeader name={'Trạng thái'} />
                    <div className="conten">
                        <Statistic />
                        <ListTable />
                    </div>
                </Route>
                <Route path={`${Match.url}/:keytable`}>
                    <ViewATable />
                </Route>
            </Switch>
        </>
    );
}

export default Index;