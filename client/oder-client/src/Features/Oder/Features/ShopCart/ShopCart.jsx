import React, { Component } from 'react';
import './index.scss'
import ListCard from './Components/ListCard/ListCard';
import Foodter from '../../Components/Foodter/Foodter';
import CompleteOder from './Components/ClOder/CompleteOder';
import { Link } from 'react-router-dom';

function ShopCart(props) {
    return (
        <div className='shopcart'>
            <Link to='/oder'>Tiếp tục chọn món</Link>
            <ListCard />
            <Foodter Component={CompleteOder}/>
        </div>
    );
}

export default ShopCart;