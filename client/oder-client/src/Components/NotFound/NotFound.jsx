import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './NotFound.scss'

function NotFound(props) {
    const [time, setTime] = useState(5);
    useEffect(() => {
        if (time !== 0) {
            setTimeout(() => {
                setTime(time - 1)
            }, 1000);
        }
    })
    return (
        <div className="not-found">
            <div className="error">404</div>
            <br /><br />
            <span className="info">Trang này không tồn tại</span>
            <a className="home">Trở lại trang chủ ({time}s)</a>
        </div>
    );
}

export default NotFound;