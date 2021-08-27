import React from 'react';
import PropTypes from 'prop-types';
import Table from '../Table/Table';
import './listtable.scss'
import { useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { SumPriceObject } from '../../../../../../utils/SumPrice';
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
                    var numberPeple = 0
                    var price = 0
                    Object.keys(tableOder).forEach(item => {
                        if (tableOder[item].keyTable === keyTable) {
                            status = 'Đang oder'
                            numberPeple = tableOder[item].numberPeople

                            price = SumPriceObject({ ...tableOder[item].confirmOder })
                        }
                    })
                    return (
                        <Table
                            key={index}
                            nameTable={`Bàn số ${numberTable}`}
                            keyTable={keyTable}
                            statusTable={status}
                            numberPeple={numberPeple}
                            price={price}
                            onClickItem={onClickItem}
                        />
                    )
                })
            }
        </div>
    );
}

export default ListTable;