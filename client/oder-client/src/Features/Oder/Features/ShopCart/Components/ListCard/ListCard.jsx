import React from 'react';
import PropsType from 'prop-types'
import Card from '../Card/Card';
import { amount } from '../../../../cartSlide';
import { removeFoodAction } from './ShopCartSlide';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { fixNumberFloat } from '../../../../../../utils/convertPrice';

ListCard.propTypes = {
    dataoder: PropsType.object
};

ListCard.defaultProps = {
    dataoder: {}
}

function ListCard(props) {
    const { dataoder } = props;
    const { keyTable } = useSelector(state => state.oderreducer)
    const dispatch = useDispatch();
    // Xu ly shop cart
    const clickBtnMinu = (keyFood) => {

    }
    const clickBtnPlus = (keyFood) => {
        console.log('+', keyFood)
    }
    const clickBtnRemove = (keyFood) => {
        const params = {
            keyFood,
            keyTable
        }
        try {
            const removeAction = removeFoodAction(params);
            const resultRemove = dispatch(removeAction);
            const result = unwrapResult(resultRemove);

        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className='listcard'>
            {
                Object.keys(dataoder).map((item, index) => {
                    const { amount: amountProduct, name, selectPrice, key, unit } = dataoder[item];

                    const { amount: amountForUnit, oderOption } = amountProduct
                    let viewAmount, viewFactor, viewUnit, sumPrice;
                    if (oderOption) {
                        viewAmount = amountForUnit
                        viewFactor = oderOption.factor
                        viewUnit = oderOption.unit
                        sumPrice = selectPrice * viewAmount* oderOption.factor
                    } else {
                        viewAmount = amountProduct.amount
                        viewUnit = unit
                        sumPrice = selectPrice * viewAmount
                    }
                    return (
                        <Card key={index}
                            name={name}
                            viewAmount={viewAmount}
                            viewUnit={viewUnit}
                            viewFactor={viewFactor}
                            selectPrice={selectPrice}
                            unit={unit}
                            sumPrice={sumPrice}

                            btnMinus={() => { clickBtnMinu(key) }}
                            btnPlus={() => { clickBtnPlus(key) }}
                            btnRemove={() => { clickBtnRemove(key) }}
                        />
                    )
                })
            }
        </div>
    );
}

export default ListCard;