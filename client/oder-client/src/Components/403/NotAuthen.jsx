import React, { useEffect, useState } from 'react';
import './notAuthen.scss'

function NotAuthen(props) {
    const [time, setTime] = useState(5);
    useEffect(() => {
        if (time !== 0) {
            setTimeout(() => {
                setTime(time - 1)
            }, 1000);
        }
    })
    return (
        <div className="not-authen">
            <div className="not-authen-conten">
                <div id="background"></div>
                <div className="top">
                    <h1 className='h1-authen'>403</h1>
                    <h3 className='h3-authen'>Từ chối truy cập</h3>
                </div>
                <div className="container">
                    <div className="ghost-copy">
                        <div className="one"></div>
                        <div className="two"></div>
                        <div className="three"></div>
                        <div className="four"></div>
                    </div>
                    <div className="ghost">
                        <div className="face">
                            <div className="eye"></div>
                            <div className="eye-right"></div>
                            <div className="mouth"></div>
                        </div>
                    </div>
                    <div className="shadow"></div>
                </div>

                <div className="bottom">
                    <p className='p-authen'>Bạn không có quyền truy cập vào trang web này</p>
                    <a className="home-authen">Trở lại trang chủ ({time}s)</a>
                </div>
            </div>
        </div>
    );
}

export default NotAuthen;