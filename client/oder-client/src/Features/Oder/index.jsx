import React from 'react';
import { useState } from 'react';
import ListProduct from './Components/Listproduct/ListProduct';
import Product from './Components/Product/Product';
import './oder.scss'
function Index(props) {

    const [viewDetails, setViewDitails] = useState(false)

    const clickOderNow = () => {
        setViewDitails(!viewDetails)
    }


    return (
        <div className='oder'>
            <Product
                viewDetail={viewDetails}
                clickOderNow = {clickOderNow}
            />
            <ListProduct/>
        </div>
    );
}

export default Index;