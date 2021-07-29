import Button from '@material-ui/core/Button';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useState } from 'react';
import OderForm from '../../OderForm/OderForm';
import './product.scss';

Product.propTypes = {
    name: PropTypes.string,
    describe: PropTypes.string,
    imageUrl: PropTypes.string,
    price: PropTypes.object,
    clickOderNow: PropTypes.func
};
Product.defaultProps = {
    name: 'Gà tiềm ớt hiểm',
    describe: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque, sunt illum id, accusamus est esse sapiente aut praesentium perspiciatis, reprehenderit et recusandae molestiae quod eius possimus fuga nisi architecto ad!",
    imageUrl: 'https://wna.cdnxbvn.com/wp-content/uploads/2019/09/cach-nau-lau-ga-tiem-ot-hiem-ngon.jpg',
    viewDetail: false,
    clickOderNow: null
}


function Product(props) {
    const { dataFood } = props

    const minPrice = Intl.NumberFormat().format(Math.min(...dataFood.price.size))

    const [select, setSelect] = useState(false);
    const onClick = () => {
        setSelect(true)
    }

    useEffect(() => {
        setSelect(false)
    }, [dataFood])
    
    return (
        <div className="product">
            <img src={dataFood.link_img} alt="img" />
            <div className="product__info">
                <div className="product__name">
                    {dataFood.name}
                </div>
                <div className="product__price">
                    <i className='bx bx-dollar'></i>
                    Từ: đ{minPrice}/{dataFood.price.unit}
                </div>
                {
                    !select && <>
                        <div className="product__describe">
                            {dataFood.describe}
                        </div>
                        <Button
                            variant='contained'
                            startIcon={<AddShoppingCartIcon />}
                            style={{
                                backgroundColor: "#74b9ff",
                                height: '3rem',
                                marginTop: '10px'
                            }}
                            onClick={onClick}
                        >Lựa chọn</Button>
                    </>
                }
                {
                    select && <div className="product__oder">
                        <OderForm
                            arrPrice={dataFood.price.size}
                            oderOption={dataFood.oderOption}
                            keyFood={dataFood.key}
                            nameFood={dataFood.name}
                        />
                    </div>
                }
            </div>
        </div>
    );
}

export default Product;