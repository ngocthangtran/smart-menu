import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './product.scss';
import Button from '@material-ui/core/Button';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import SlideValue from '../../../../Components/SlideValue/SildeValue'

Product.propTypes = {
    name: PropTypes.string,
    describe: PropTypes.string,
    imageUrl: PropTypes.string
};
Product.defaultProps = {
    name: 'Gà tiềm ớt hiểm',
    describe: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque, sunt illum id, accusamus est esse sapiente aut praesentium perspiciatis, reprehenderit et recusandae molestiae quod eius possimus fuga nisi architecto ad!",
    imageUrl: 'https://wna.cdnxbvn.com/wp-content/uploads/2019/09/cach-nau-lau-ga-tiem-ot-hiem-ngon.jpg'
}


function Product(props) {
    const { name, describe, imageUrl } = props
    useEffect(() => {
        const img = document.querySelector('.product__image');
        img.style.height = img.offsetWidth;
    })

    const styleBt = {
        borderRadius: 20,
        backgroundColor: "#2ecc71",
        padding: "10px 36px",
        fontSize: "18px",
        width: '12em',
        marginTop: 10
    }

    return (
        <div className="product">
            <div className="product__info">
                <h1>{name}</h1>
                <div>{describe}</div>
                <div className='details'>
                    <div className='details__count'>
                        <div className="details__btn">
                            -
                        </div>
                        <input className='details__value' value={0} />
                        <div className="details__btn">
                            +
                        </div>
                    </div>
                    <SlideValue />
                </div>
                <Button
                    variant="contained"
                    style={styleBt}
                    startIcon={<AddShoppingCartIcon />}
                >Oder Now</Button>
            </div>
            <div className="product__image">
                <img src={imageUrl} alt="img product not found"></img>
            </div>
        </div>
    );
}

export default Product;