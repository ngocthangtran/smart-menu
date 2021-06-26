import React from 'react';
import Button from '@material-ui/core/Button';
import DoneAllIcon from '@material-ui/icons/DoneAll';

import './index.scss'

function CompleteOder(props) {
    return (
        <>
            <div className='customfoodter'>
                <div className='sum'>
                    Tổng tiền thanh toán
                    <br />
                    đ1.530.000
                    <br/>
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    endIcon={<DoneAllIcon />}
                    style={{
                        background: "#e74c3c",
                        borderRadius: 'uset'
                    }}
                >
                    Báo món (5)
                </Button>
            </div>
        </>
    );
}

export default CompleteOder;