import React, { useEffect, useRef, useState } from 'react';
import './index.scss'

function InputNumber(props) {
    const inputEl = useRef(null);
    const [value, setValue] = useState('');
    useEffect(() => {
        inputEl.current.focus()
        // setTimeout(() => {
        //     inputEl.current.blur()
        // }, 2000);
    })

    useEffect(() => {
        if (value.length === 4) {
            inputEl.current.blur()
        }
    })

    return (
        <div className='center'>
            <div class="mesgcircle">
                Bàn này đã có người oder!
                Để xác nhận bạn cũng là người bàn này
                xin vui lòng lấy mã xác nhận từ người đã truy cập được vào hệ thống.<br />
                Mã có trong phần menu, nhập ở bên dưới
            </div>
            <input
                ref={inputEl}
                type="number"
                className="input"
                value={value}
                onChange={(e) => { setValue(e.target.value) }}
            />

        </div>
    );
}

export default InputNumber;