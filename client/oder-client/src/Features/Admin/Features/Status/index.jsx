import React from 'react';
import MainHeader from '../../Components/MainHeader/MainHeader';
import ListTable from './Component/ListTable/ListTable';
import Statistic from './Component/Statistic/Statistic';
import './index.scss'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllTableAction, setTableOder } from './statusSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { database } from '../../../../utils/firebase';
const oderRef = process.env.REACT_APP_NAME_REF_ODER
function Index(props) {
    const dispatch = useDispatch();
    useEffect(async () => {
        const allDeskAction = getAllTableAction();
        const result = unwrapResult(await dispatch(allDeskAction))
        database.ref(oderRef).on('value', snapShort => {
            if (snapShort.val()) {
                dispatch(setTableOder(snapShort.val()))
            }else{
                dispatch(setTableOder({}))
            }
        })
    })
    return (
        <>
            <MainHeader name={'Trạng thái'} />
            <div className="conten">
                <Statistic />
                <ListTable />
            </div>
        </>
    );
}

export default Index;