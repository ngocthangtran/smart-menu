import React, { useEffect } from 'react';
import Header from '../../../Components/MainHeader/MainHeader';
import QrCode from 'qrcode.react';
import { useState } from 'react';
import FormInfoTable from './FormInfoTable';
import './conten.scss'
import { useDispatch } from 'react-redux';
import { AddNewTable, GetLastTable, checkTableExits } from '../TableSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import Snackbar from '../../../../../Components/Snackbar/Snakbar';

function CreateTable({ number }) {
    const [open, setOpen] = useState(false);
    const [res, setRes] = useState({
        status: '',
        message: ''
    })

    const dispatch = useDispatch();

    const [numberTable, setNumberTable] = useState(1);

    //hadling get last table
    useEffect(async () => {
        const LastTableAction = GetLastTable();
        const dispatchAction = await dispatch(LastTableAction);
        const result = unwrapResult(dispatchAction);
        setNumberTable(result.data.numberTable + 1)
        setQrValue(`${systemLink}/numbertable${result.data.numberTable + 1}`)

        const { status, message } = result
        setOpen(true)
        setRes({
            status: status,
            message: message
        })
    }, [])

    //this link is system link plus code table when we scan qr code    
    const url = new URL(window.location.href);
    const [systemLink, setsystemLink] = useState(`${url.protocol}//${url.host}/oder`);

    //when scan qr return value includes system link and table key
    const [qrValue, setQrValue] = useState(`${systemLink}/numbertable${numberTable}`);

    //when numberTable on change then qr value on change
    const onChangeNumberTable = (value) => {
        setNumberTable(parseInt(value))
        setQrValue(`${systemLink}/numbertable${value}`)
    }

    //when system link on change then qr value on change
    const changeSystemLink = (value) => {
        setsystemLink(value);
        setQrValue(`${value}/numbertable${numberTable}`)
    }

    //handling add new Table using reducer
    const onSubmit = async (value) => {
        try {
            const CheckTable = await checkTableExits({ keyTable: value.keyTable })
            if (CheckTable.status === 200) {
                const { status } = CheckTable;
                setOpen(true)
                setRes({
                    status: status,
                    message: "Bàn đã tồn tại"
                })
                return
            }
            const AddTableAction = AddNewTable(value);
            const dispatchAction = await dispatch(AddTableAction);
            const result = unwrapResult(dispatchAction);
            const { status, message } = result
            setOpen(true)
            setRes({
                status: status,
                message: message
            })
        } catch (error) {
            console.error('Onsubmid table', error)
        }
    }
    useEffect(() => {
        setTimeout(() => {
            if (open) {
                setOpen(false)
            }
        }, 5000);
    }, [res])
    return (
        <>
            <Header name="Tạo bàn" />
            <div className="conten">
                <div className="info__table">
                    <FormInfoTable
                        numberTable={numberTable}
                        systemLink={systemLink}
                        linkOderTable={qrValue}
                        changeSystemLink={changeSystemLink}
                        onChange={onChangeNumberTable}
                        onSubmit={onSubmit}
                    />
                    <div className="qr__conten">
                        <div className="qr__conten__name">
                            Bàn số {numberTable}
                        </div>
                        <QrCode
                            value={qrValue}
                            size={200}
                            level="H"
                            id='canvas'
                        />
                        <div className="qr__conten__intro">
                            <div>
                                Nhà hàng hưng thịnh
                            </div>
                            <span>
                                Tinh hoa ẩm thực - con người Việt Nam
                            </span>
                        </div>
                    </div>
                </div>
                <div className="history__table">

                </div>
            </div>
            <Snackbar
                isOpen={open}
                message={res.message}
            />
        </>
    );
}

export default CreateTable;