import React from 'react';
import PropTypes from 'prop-types';
import './index.scss'
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import IconButton from '@material-ui/core/IconButton';
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar';
import { useEffect } from 'react';
import { database } from '../../../../../utils/firebase';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { fixNumberFloat } from '../../../../../utils/convertPrice';

const StyledBadge = withStyles((theme) => ({
    badge: {
        right: -2,
        top: 10,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: "0 4px",
    }
}))(Badge);


ListProduct.propTypes = {
    countProduct: PropTypes.number,
    countShop: PropTypes.number,
    foodCategory: PropTypes.object
};

ListProduct.defaultProps = {
    countProduct: 0,
    countShop: 0
}

function IconProduct(props) {
    const { clickItem, index, linkImg, keyFood } = props;
    const { keyTable } = useSelector(state => state.oderreducer)
    const [badge, setBadge] = useState(undefined)

    useEffect(() => {
        database.ref(`Oder/${keyTable}/dataOder/${keyFood}/amount`).on('value', res => {
            var data = res.val()
            if (data) {

                if (data.oderOption) {
                    const nhan = data.amount * data.oderOption.factor
                    setBadge(fixNumberFloat(nhan))
                }
                else {
                    setBadge(data.amount)
                }
            }
        })
        return () => {
            setBadge(undefined)
        }
    })
    return (
        <IconButton key={index} onClick={() => {
            clickItem(index)
        }}
        >
            <StyledBadge badgeContent={badge} invisible={badge ? false : true} color="secondary">
                <Avatar style={{ width: '60px', height: '60px' }} src={linkImg}>Q</Avatar>
            </StyledBadge>
        </IconButton>
    )
}
function ListProduct(props) {
    const { foodCategory, clickItem } = props;
    const { amount: amountProduct } = useSelector(state => state.cartreducer)
    const { keyTable } = useSelector(state => state.oderreducer)

    return (
        <>
            <div className='shopcartIcon'>
                <Link to={`/oder/${keyTable}/shopcart`} >
                    <IconButton>
                        <StyledBadge badgeContent={amountProduct} invisible={amountProduct === 0 ? true : false} color="secondary" >
                            <LocalGroceryStoreIcon fontSize={"large"} color={"action"} />
                        </StyledBadge>
                    </IconButton>
                </Link>
            </div>
            <div className='list'>
                {
                    foodCategory && Object.keys(foodCategory).map((item, index) => {
                        const linkImg = foodCategory[item].link_img

                        return (
                            <div key={index}>
                                <IconProduct

                                    index={index}
                                    linkImg={linkImg}
                                    clickItem={clickItem}
                                    keyFood={foodCategory[item].key}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
}

export default ListProduct;