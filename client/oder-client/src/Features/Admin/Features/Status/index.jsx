import React from 'react';
import MainHeader from '../../Components/MainHeader/MainHeader';
import ListTable from './Component/ListTable/ListTable';
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
                            <i className='bx bxs-category' style={{
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
                            <i className='bx bx-shopping-bag' style={{
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
                            <i className='bx bx-dollar' style={{
                                color: '#0984e3'
                            }}  ></i>
                        </div>
                    </div>
                </div>
                <ListTable />
            </div>
        </>
    );
}

export default index;