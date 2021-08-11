import { Button } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import './index.scss';

function InputNumber(props) {
    const { getCode, message: messageProps, hidden } = props;
    const inputEl = useRef(null);
    const [value, setValue] = useState('');
    const [message, setMessage] = useState('')

    useEffect(() => {
        inputEl.current.focus()
    })

    return (
        <div className='center'>
            <div className={message.length !== 0 ? "mesgcircle red" : "mesgcircle"}>
                {/* <div className="mesgcircle"> */}
                <div className="mesgcircle__title">
                    <i className='bx bx-message-alt-error'></i>
                    Thông báo:
                </div>

                {message.length !== 0 ? message : messageProps}
            </div>
            <input
                ref={inputEl}
                type="number"
                className="input"
                value={value}
                onChange={async (e) => {
                    setValue(e.target.value)
                    const notification = await getCode(e.target.value)
                    if (notification) {
                        if (notification.status === false) {
                            inputEl.current.focus()
                            setMessage(notification.message)
                            setValue('')
                        }
                    }
                }}
            />
            <Button
                variant='outlined'
                style={{
                    marginTop: 10,
                    display: hidden ? 'none' : false

                }}
                onClick={() => { getCode(value, { asda:123 }) }}                
            >Xác nhận</Button>

        </div>
    );
}

export default InputNumber;