import React from 'react';
import PropTypes from 'prop-types';
import MainHeader from '../../../Components/MainHeader/MainHeader'
import TableFields from '../../../../../Custom-fields/Table/Table-field';
import FormChange from './FormChange';
import './viewtable.scss'
import Button from '@material-ui/core/Button';
import DoneAllIcon from '@material-ui/icons/DoneAll';
ViewATable.propTypes = {

};

function ViewATable(props) {
    return (
        <>
            <MainHeader name='Table 1' />
            <div className='conten'>
                <div className='table__details'>
                    <TableFields
                        size={400}
                    />
                </div>
                <FormChange />
                <div className='foodter-table'>
                    Tổng tiền: đ2.000.000
                    <Button
                        variant="contained"
                        color="secondary"
                        endIcon={< DoneAllIcon />}
                        style={{
                            height:'4rem'
                        }}
                    >
                        Xác nhận<br/>
                        Đã nhận tiền
                    </Button>
                </div>
            </div>
        </>
    );
}

export default ViewATable;