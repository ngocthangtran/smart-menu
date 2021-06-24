import React from 'react';
import PropTypes from 'prop-types';

import './card.scss'

Card.propTypes = {
    name: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
    sum: PropTypes.number,
    removeProduct: PropTypes.func
};

Card.defauldProps = {
    name: '',
    price: 0,
    count: 1,
    sum: 0,
    removeProduct: null
}

function Card(props) {
    return (
        <div className='productcard'>
            <div className='productcard__info'>
                <p>Dê hấp xả tía tô</p>
                <div className='option'>150.000</div>
                <div className="count">
                    <div>-</div>
                    <div contentEditable="true" suppressContentEditableWarning={true}>4</div>
                    <div >+</div>
                </div>
            </div>
            <div className='productcard__count'>
                <div className="option">Loại bỏ</div>
                <div className='productcard__sum'>
                    150.000 x 4 = 600.000
                </div>
            </div>
        </div>
    );
}

export default Card;