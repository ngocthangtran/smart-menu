import React, { Component } from 'react';

import './status.css'

class status extends Component {
    render() {
        return (
            <>
                <div class="row">
                    <div class="box">
                        <div class="counter-title">
                            Số bàn sử dụng
                    </div>
                        <div class="counter-info">
                            <div class="counter-count">
                                6060
                        </div>
                            <i class='bx bxs-category'></i>
                        </div>
                    </div>
                    <div class="box">
                        <div class="counter-title">
                            Số món đã bán
                    </div>
                        <div class="counter-info">
                            <div class="counter-count">
                                50
                        </div>
                            <i class='bx bx-shopping-bag'></i>
                        </div>
                    </div>
                    <div class="box">
                        <div class="counter-title">
                            Thu nhập
                    </div>
                        <div class="counter-info">
                            <div class="counter-count">
                                9.520.000đ
                        </div>
                            <i class='bx bx-dollar'></i>
                        </div>
                    </div>
                </div>
                <div class="tables">
                    <div className='cards'>
                        <div class="card">
                            <div class="card-head">
                                <div class="card-name">
                                    Bàn 1
                            </div>
                                <div class="card-status">
                                    Trống
                                <div class="dot green"></div>
                                </div>
                            </div>
                            <div class="card-info">
                                <div class="card-info-title">
                                    Số người: <br></br> số món: <br></br> Số tiền:
                                </div>
                                <div class="card-info-count">
                                    5 <br></br> 3 <br></br> 1.500.200đ
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default status;