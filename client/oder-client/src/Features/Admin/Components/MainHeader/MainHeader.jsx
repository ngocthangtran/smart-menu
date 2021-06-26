import React from 'react';
import PropTypes from 'prop-types';
import './mainheader.scss'
MainHeader.propTypes = {
    name:PropTypes.string
};

function MainHeader(props) {
    const {name} = props
    return (
        <div className='header-main'>
            {name}
        </div>
    );
}

export default MainHeader;