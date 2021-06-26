import React from 'react';
import MainHeader from '../../Components/MainHeader/MainHeader';
import './index.scss'
function index(props) {
    return (
        <>
            <MainHeader name={'Trạng thái'} />
            <div className="conten">
                <div className='statistical'>
                    <div className='statistical-item'>
                        <div className='statistical-item-title' >
                            Số bàn sử dụng
                        </div>
                        <div className='statistical-item-count' >
                            <div>
                                4000
                            </div>
                            <i class='bx bxs-category' style={{
                                color: '#0984e3'
                            }}></i>
                        </div>
                    </div>
                    <div className='statistical-item'>
                        <div className='statistical-item-title' >
                            Số món đã bán
                        </div>
                        <div className='statistical-item-count' >
                            <div>
                                23
                            </div>
                            <i class='bx bx-shopping-bag' style={{
                                color: '#0984e3'
                            }} ></i>
                        </div>
                    </div>
                    <div className='statistical-item'>
                        <div className='statistical-item-title' >
                            Thu nhập
                        </div>
                        <div className='statistical-item-count' >
                            <div>
                                12.540.000
                            </div>
                            <i class='bx bx-dollar' style={{
                                color: '#0984e3'
                            }}  ></i>
                        </div>
                    </div>
                </div>
                <div className="listtable">
                </div>
            </div>
        </>
    );
}

export default index;