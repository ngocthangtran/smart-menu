import React from 'react';
import { useState } from 'react';
import ListProduct from './Listproduct/ListProduct';
import Product from './Product/Product';
import './oder.scss'
import Foodter from '../../Components/Foodter/Foodter';
function Index(props) {

    const [viewDetails, setViewDitails] = useState(false)

    const clickOderNow = () => {
        setViewDitails(!viewDetails)
    }


    return (
        <div className='oder-main'>
            <Product
                viewDetail={viewDetails}
                clickOderNow = {clickOderNow}
            />
            <Foodter Component={ListProduct}/>
        </div>
    );
}

export default Index;