import React from 'react';
import PropTypes from 'prop-types';
import './index.scss'
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import IconButton from '@material-ui/core/IconButton';
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";

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

};

function ListProduct(props) {
    return (
        <div className="listproduct">
            <div className='shopcart'>
                <IconButton>
                    <StyledBadge badgeContent={4} color="secondary" >
                        <LocalGroceryStoreIcon fontSize={"large"} color={"action"} />
                    </StyledBadge>
                </IconButton>
            </div>
            <div className='list'>
                <IconButton>
                    <StyledBadge badgeContent={4} color="secondary">
                    <Avatar style={{width:'70px',height:'70px'}} src='https://cdn.daotaobeptruong.vn/wp-content/uploads/2019/09/thit-de-hap-tia-to.jpg'>Q</Avatar>
                    </StyledBadge>
                </IconButton>
                {/* <Avatar style={{width:'70px',height:'70px'}} src='https://wna.cdnxbvn.com/wp-content/uploads/2019/09/cach-nau-lau-ga-tiem-ot-hiem-ngon.jpg'>W</Avatar>
                <Avatar style={{width:'70px',height:'70px'}}>E</Avatar>
                <Avatar style={{width:'70px',height:'70px'}}>R</Avatar>
                <Avatar style={{width:'70px',height:'70px'}}>T</Avatar>
                <Avatar style={{width:'70px',height:'70px'}}>Y</Avatar>
                <Avatar style={{width:'70px',height:'70px'}}>U</Avatar>
                <Avatar style={{width:'70px',height:'70px'}}>I</Avatar>
                <Avatar style={{width:'70px',height:'70px'}}>O</Avatar>
                <Avatar style={{width:'70px',height:'70px'}}>P</Avatar>

                <Avatar style={{width:'70px',height:'70px'}}>Q</Avatar>
                <Avatar style={{width:'70px',height:'70px'}}>W</Avatar>
                <Avatar style={{width:'70px',height:'70px'}}>E</Avatar>
                <Avatar style={{width:'70px',height:'70px'}}>R</Avatar>
                <Avatar style={{width:'70px',height:'70px'}}>T</Avatar>
                <Avatar style={{width:'70px',height:'70px'}}>Y</Avatar>
                <Avatar style={{width:'70px',height:'70px'}}>U</Avatar>
                <Avatar style={{width:'70px',height:'70px'}}>I</Avatar>
                <Avatar style={{width:'70px',height:'70px'}}>O</Avatar>
                <Avatar style={{width:'70px',height:'70px'}}>P</Avatar> */}
            </div>
        </div>
    );
}

export default ListProduct;