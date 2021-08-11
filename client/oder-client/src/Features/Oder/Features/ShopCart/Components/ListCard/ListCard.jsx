import React from 'react';
import PropsType from 'prop-types'
import Card from '../Card/Card';
import { quantityChangeFood, removeFoodAction } from './ShopCartSlide';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { sumprice } from '../../../../cartSlide';

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
    const clickBtnMinu = (keyFood, quantity) => {
        if (quantity === 1) return
        const params = {
            keyTable,
            keyFood,
            quantityChange: quantity - 1
        }
        try {
            const actionQuantityChange = quantityChangeFood(params)
            unwrapResult(dispatch(actionQuantityChange))
        } catch (error) {
            console.error(error)
        }
    }
    const clickBtnPlus = (keyFood, quantity) => {
        const params = {
            keyTable,
            keyFood,
            quantityChange: quantity + 1
        }
        try {
            const actionQuantityChange = quantityChangeFood(params)
            unwrapResult(dispatch(actionQuantityChange))
        } catch (error) {
            console.error(error)
        }
    }
    const clickBtnRemove = (keyFood, quantity) => {
        const params = {
            keyFood,
            keyTable
        }
        try {
            const removeAction = removeFoodAction(params);
            const resultRemove = dispatch(removeAction);
            unwrapResult(resultRemove);
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className='listcard'>
            {
                Object.keys(dataoder).map((item, index) => {
                    const { amount: amountProduct, name, selectPrice, key, unit } = dataoder[item];
                    console.log(dataoder[item])

                    const { amount: amountForUnit, oderOption } = amountProduct
                    let viewAmount, viewFactor, viewUnit, sumPrice;
                    if (oderOption) {
                        viewAmount = amountForUnit
                        viewFactor = oderOption.factor
                        viewUnit = oderOption.unit
                        sumPrice = selectPrice * viewAmount * oderOption.factor
                        // console.log(sumPrice, viewAmount, oderOption.factor)
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

                            btnMinus={() => { clickBtnMinu(key, viewAmount) }}
                            btnPlus={() => { clickBtnPlus(key, viewAmount) }}
                            btnRemove={() => { clickBtnRemove(key, viewAmount) }}
                        />
                    )
                })
            }
        </div>
    );
}

export default ListCard;