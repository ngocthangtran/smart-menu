import React from 'react';
import './index.scss'
import ListCard from './Components/ListCard/ListCard';
import Foodter from '../../Components/Foodter/Foodter';
import CompleteOder from './Components/ClOder/CompleteOder';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ShopCart(props) {
    const { dataOder, amount, sumPrice } = useSelector(state => state.cartreducer)
    const { keyTable } = useSelector(state => state.oderreducer)
    
    
    return (
        <div className='shopcart'>
            <Link to={`/oder/${keyTable}`}>Tiếp tục chọn món</Link>
            <ListCard dataoder={dataOder} />
            <Foodter Component={<CompleteOder amount={amount} sumprice={sumPrice} />} />
        </div>
    );
}

export default ShopCart;