import React from 'react';
import './index.scss'
import ListCard from './Components/ListCard/ListCard';
import Foodter from '../../Components/Foodter/Foodter';
import CompleteOder from './Components/ClOder/CompleteOder';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { sumprice } from '../../cartSlide';

function ShopCart(props) {
    const { dataOder, amount, sumPrice } = useSelector(state => state.cartreducer)

    return (
        <div className='shopcart'>
            <Link to='/oder'>Tiếp tục chọn món</Link>
            <ListCard dataoder={dataOder} />
            <Foodter Component={<CompleteOder amount={amount} sumprice={sumPrice} />} />
        </div>
    );
}

export default ShopCart;