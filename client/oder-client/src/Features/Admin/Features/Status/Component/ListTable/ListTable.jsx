import React from 'react';
import PropTypes from 'prop-types';
import Table from '../Table/Table';
import './listtable.scss'
ListTable.propTypes = {
    table: PropTypes.array
};

function ListTable(props) {
    return (
        <div className='listtable' >
            <Table />
            <Table />

        </div>
    );
}

export default ListTable;