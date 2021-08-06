import Button from '@material-ui/core/Button';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import OderForm from '../../OderForm/OderForm';
import './product.scss';


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

    const { keyTable } = useSelector(state => state.oderreducer);

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
                            unit={dataFood.price.unit}
                        />
                    </div>
                }
            </div>
        </div>
    );
}

export default Product;