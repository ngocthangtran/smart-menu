import React, { useEffect, useRef, useState } from 'react';
import './index.scss'
import Cookies from 'js-cookie';
import { Code } from '@material-ui/icons';

function InputNumber(props) {
    const { getCode } = props;
    const inputEl = useRef(null);
    const [value, setValue] = useState('');
    const [message, setMessage] = useState('');
    useEffect(() => {
        inputEl.current.focus()
    })

    useEffect(() => {
        const cook = JSON.parse(Cookies.get('table'))
        if (cook.code) {
            setMessage("Mã bạn vừa nhập không đúng! Vui lòng nhập lại")
        }
        if (getCode(value)) {
            inputEl.current.blur()
            setValue('')
        }
    })

    return (
        <div className='center'>
            <div className={message.length !== 0 ? "mesgcircle red" : "mesgcircle"}>
                <div className="mesgcircle__title">
                    <i className='bx bx-message-alt-error'></i>
                    Thông báo:
                </div>

                {
                    message.length !== 0 ?
                        message
                        :
                        "Bàn này đã có người oder!Để xác nhận bạn cũng là người bàn này xin vui lòng lấy mã xác nhận từ người đã truy cập được vào hệ thống.<br />Mã có trong phần menu, nhập ở bên dưới"
                }
            </div>
            <input
                ref={inputEl}
                type="number"
                className="input"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value)
                    getCode(e.target.value)
                }}
            />

        </div>
    );
}

export default InputNumber;