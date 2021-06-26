import React from 'react';
import PropTypes from 'prop-types';
import './main.scss'


Main.propTypes = {
    Component: PropTypes.func
};

Main.defauldProps = {
    Component:null
}

function Main(props) {
    const {Component} = props;
    return (
        <div className='main'>
            {
                Component && <Component/>
            }
        </div>
    );
}

export default Main;