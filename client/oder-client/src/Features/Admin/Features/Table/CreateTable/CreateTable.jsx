import React from 'react';
import Header from '../../../Components/MainHeader/MainHeader';
import QrCode from 'qrcode.react';
import { useState } from 'react';
import FormInfoTable from './FormInfoTable';
import './conten.scss'
import { useRef } from 'react';

function CreateTable(props) {

    const [numberTable, setNumberTable] = useState(1);
    //this link is system link plus code table when we scan qr code    
    const url = new URL(window.location.href);
    const [systemLink, setsystemLink] = useState(`${url.protocol}//${url.host}/oder`);
    //when scan qr return value includes system link and table key
    const [qrValue, setQrValue] = useState(`${systemLink}/numbertable${numberTable}`);
    const onChangeNumberTable = (value) => {
        setNumberTable(value)
        setQrValue(`${systemLink}/numbertable${value}`)
    }
    const changeSystemLink = (value) => {
        setsystemLink(value);
        setQrValue(`${value}/numbertable${numberTable}`)
    }
    return (
        <>
            <Header name="Tạo bàn" />
            <div className="conten">
                <div className="info__table">
                    <FormInfoTable
                        numberTable={numberTable}
                        onChange={onChangeNumberTable}
                        linkQr='Bàn chưa có trong hệ thống'
                        systemLink={systemLink}
                        changeSystemLink={changeSystemLink}
                        linkOderTable={qrValue}
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
        </>
    );
}

export default CreateTable;