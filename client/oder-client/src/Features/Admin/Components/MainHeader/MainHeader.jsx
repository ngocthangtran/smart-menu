import React from 'react';
import PropTypes from 'prop-types';
import './mainheader.scss'
import { FormControl } from '@material-ui/core';
import NativeSelect from '@material-ui/core/NativeSelect';
MainHeader.propTypes = {
    name: PropTypes.string
};
MainHeader.defaultProps = {
    select: {
        bool: false
    }
}

function MainHeader(props) {
    const { name, select } = props
    return (
        <div className='header-main'>
            {name}
            {
                select.bool && <FormControl >
                    <NativeSelect
                        value={select.classify}
                        onChange={select.handlingSelectClassify}
                    >
                        <option value={'food'}>Món ăn</option>
                        <option value={'drinks'}>Đồ uống</option>
                    </NativeSelect>
                </FormControl>
            }
        </div>
    );
}

export default MainHeader;