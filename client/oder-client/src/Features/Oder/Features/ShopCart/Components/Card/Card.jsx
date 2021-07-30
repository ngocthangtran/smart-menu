import React from 'react';
import PropTypes from 'prop-types';

import './card.scss'
import { shortenMoney } from '../../../../../../utils/convertPrice';

Card.propTypes = {
    name: PropTypes.string,
    unit: PropTypes.string,
    viewUnit: PropTypes.string,
    selectPrice: PropTypes.number,
    viewAmount: PropTypes.number,
    sumPrice: PropTypes.number,
};

Card.defaultProps = {
    sumPrice: 0,
    viewUnit: 'no unit',
    viewAmount: 0,
    selectPrice: 0,
    name: 'no name'
}

function Card(props) {
    const {
        selectPrice, name, viewAmount, viewUnit, sumPrice, unit,
        btnMinus, btnPlus, btnRemove
    } = props;


    return (
        <div className='productcard'>
            <div className='productcard__info'>
                <p>{name}</p>
                <div className='option'>{`${shortenMoney(selectPrice)}/${unit}`}</div>
                <div className="count">
                    <div onClick={btnMinus}>-</div>
                    <div contentEditable="true" suppressContentEditableWarning={true}>{viewAmount}</div>
                    <div onClick={btnPlus}>+</div>

                </div>
            </div>
            <div className='productcard__count'>
                <div className="option" onClick={btnRemove}>Loại bỏ</div>
                <div className='productcard__sum'>
                    {selectPrice} x {viewAmount} /{viewUnit}
                    <div className="prices">
                        = {shortenMoney(sumPrice)}
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Card;