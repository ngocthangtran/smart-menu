import React from 'react';
import PropTypes from 'prop-types';
import Table from '../Table/Table';
import './listtable.scss'
import { useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
ListTable.propTypes = {
    table: PropTypes.array
};

function ListTable(props) {
    const history = useHistory();
    const Match = useRouteMatch();

    const { listTable, tableOder } = useSelector(state => state.statusReducer);
    const onClickItem = (keyTable) => {
        history.push(`${Match.url}/${keyTable}`)
    }
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
                    return (
                        <Table
                            key={index}
                            nameTable={`Bàn số ${numberTable}`}
                            keyTable={keyTable}
                            statusTable={status}
                            onClickItem={onClickItem}
                        />
                    )
                })
            }
        </div>
    );
}

export default ListTable;