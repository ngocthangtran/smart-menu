import React from 'react';
import PropTypes from 'prop-types';
import Table from '../Table/Table';
import './listtable.scss'
import { useSelector } from 'react-redux';
ListTable.propTypes = {
    table: PropTypes.array
};

function ListTable(props) {
    const { listTable, tableOder } = useSelector(state => state.statusReducer);
    return (
        <div className='listtable' >
            {
                listTable.map((item, index) => {
                    const { keyTable, numberTable } = item
                    var status = 'Trống'
                    Object.keys(tableOder).forEach(item => {
                        if (tableOder[item].keyTable === keyTable) {
                            status = 'Đang oder'
                        }
                    })
                    console.log(status)
                    return (
                        <Table
                            key={index}
                            nameTable={`Bàn số ${numberTable}`}
                            keyTable={keyTable}
                            statusTable={status}
                        />
                    )
                })
            }
        </div>
    );
}

export default ListTable;