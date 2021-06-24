import React, { Component } from 'react';
import './index.scss'
import ListCard from './Components/ListCard/ListCard';
import Foodter from '../../Components/Foodter/Foodter';
import CompleteOder from './Components/ClOder/CompleteOder';

function ShopCart(props) {
    return (
        <div className='shopcart'>
            <ListCard />
            <Foodter Component={CompleteOder}/>
        </div>
    );
}

export default ShopCart;