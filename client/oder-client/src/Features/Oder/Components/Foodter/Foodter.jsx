import React from 'react';
import PropTypes from 'prop-types';
import './foodter.scss'

Foodter.propTypes = {
    Component: PropTypes.object
};

Foodter.defauldProps = {
    Component: null
}

function Foodter(props) {
    const { Component } = props;
    
    return (
        <div className="foodter">
            {Component&&Component}
        </div>
    );
}

export default Foodter;