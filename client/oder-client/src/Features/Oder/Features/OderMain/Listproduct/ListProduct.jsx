import React from 'react';
import PropTypes from 'prop-types';
import './index.scss'
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import IconButton from '@material-ui/core/IconButton';
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar';

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
    countShop: PropTypes.number
};

ListProduct.defaultProps = {
    countProduct: 0,
    countShop: 0
}

function ListProduct(props) {
    return (
        <>
            <div className='shopcartIcon'>
                <Link to='/oder/shopcart' >
                    <IconButton>
                        <StyledBadge badgeContent={4} color="secondary" >
                            <LocalGroceryStoreIcon fontSize={"large"} color={"action"} />
                        </StyledBadge>
                    </IconButton>
                </Link>
            </div>
            <div className='list'>
                <IconButton>
                    <StyledBadge badgeContent={4} color="secondary">
                        <Avatar style={{ width: '60px', height: '60px' }} src='https://cdn.daotaobeptruong.vn/wp-content/uploads/2019/09/thit-de-hap-tia-to.jpg'>Q</Avatar>
                    </StyledBadge>
                </IconButton>
                <Avatar style={{ width: '60px', height: '60px' }} src='https://wna.cdnxbvn.com/wp-content/uploads/2019/09/cach-nau-lau-ga-tiem-ot-hiem-ngon.jpg'>W</Avatar>
                <Avatar style={{ width: '60px', height: '60px' }}>E</Avatar>
                <Avatar style={{ width: '60px', height: '60px' }}>R</Avatar>
                <Avatar style={{ width: '60px', height: '60px' }}>T</Avatar>
                <Avatar style={{ width: '60px', height: '60px' }}>Y</Avatar>
                <Avatar style={{ width: '60px', height: '60px' }}>U</Avatar>
                <Avatar style={{ width: '60px', height: '60px' }}>I</Avatar>
                <Avatar style={{ width: '60px', height: '60px' }}>O</Avatar>
                <Avatar style={{ width: '60px', height: '60px' }}>P</Avatar>

                <Avatar style={{ width: '60px', height: '60px' }}>Q</Avatar>
                <Avatar style={{ width: '60px', height: '60px' }}>W</Avatar>
                <Avatar style={{ width: '60px', height: '60px' }}>E</Avatar>
                <Avatar style={{ width: '60px', height: '60px' }}>R</Avatar>
                <Avatar style={{ width: '60px', height: '60px' }}>T</Avatar>
                <Avatar style={{ width: '60px', height: '60px' }}>Y</Avatar>
                <Avatar style={{ width: '60px', height: '60px' }}>U</Avatar>
                <Avatar style={{ width: '60px', height: '60px' }}>I</Avatar>
                <Avatar style={{ width: '60px', height: '60px' }}>O</Avatar>
                <Avatar style={{ width: '60px', height: '60px' }}>P</Avatar>
            </div>
        </>
    );
}

export default ListProduct;