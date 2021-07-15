import React from 'react';
import PropTypes from 'prop-types';
import './product.scss';
import Button from '@material-ui/core/Button';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import SlideValue from '../../../../../Components/SlideValue/SildeValue'
import { useEffect } from 'react';

Product.propTypes = {
    name: PropTypes.string,
    describe: PropTypes.string,
    imageUrl: PropTypes.string,
    viewDetail: PropTypes.bool,
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
    const { name, describe, imageUrl, viewDetail, clickOderNow } = props
    const styleBt = {
        borderRadius: 20,
        backgroundColor: "#2ecc71",
        padding: "10px 36px",
        fontSize: "18px",
        width: '12em',
        marginTop: 10
    }

    useEffect(() => {

        // const detailsElement = document.querySelector('.details')
        // const activeDetails = document.querySelector('.details.active');
        // if (viewDetail) {
        //     activeDetails.style.height = '160px'
        // } else {
        //     detailsElement.style.height = `0px`
        // }
    })

    return (
        <div className="product">
            <div className="product__info">
                <h1>{name}</h1>
                <div>{describe}</div>
                <div className={viewDetail ? 'details active' : 'details'}>
                    <div>
                        Số lượng
                    </div>
                    <div className='details__count'>
                        <div className="btn">
                            -
                        </div>
                        <div className="btn" contentEditable="true" suppressContentEditableWarning={true}>4</div>
                        <div className="btn">
                            +
                        </div>
                    </div>
                    <div>Giá</div>
                    <SlideValue />
                </div>
                <Button
                    variant="contained"
                    style={styleBt}
                    startIcon={<AddShoppingCartIcon />}
                    onClick={clickOderNow}
                >
                    Oder Now
                </Button>
            </div>
            <div className="product__image">
                <img src={imageUrl} alt="img product not found"></img>
            </div>
        </div>
    );
}

export default Product;