import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React from 'react';
import PropTypes from 'prop-types';
import MenuClick from '../../../../../Components/ClickMenu/ClickMenu';

RecipeReviewCard.propTypes = {
    name: PropTypes.string,
    price: PropTypes.object,
    describeProduct: PropTypes.string,
    linkImg: PropTypes.string,
    deleteFood: PropTypes.func
}

RecipeReviewCard.defaultProps = {
    name: 'No name',
    price: 0,
    describeProduct: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam quia iure repudiandae vitae quidem, delectus quod ad voluptatibus expedita voluptates illo unde voluptate libero! Esse iure molestias excepturi sint quidem?',
    linkImg: '',
    deleteFood: null
}

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 300,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
}));

export default function RecipeReviewCard(props) {
    const classes = useStyles();
    const { name, price, linkImg, describeProduct, handlingFoodCard, keyFood } = props;
    var minPrice = Intl.NumberFormat().format(Math.min.apply(Math, price.size))

    const getOptopn = (option) => {
        if(option==="Xóa"){
            handlingFoodCard.delete(keyFood)
        }else{
            handlingFoodCard.repair(keyFood)
        }
    }
    return (
        <Card className={classes.root}>
            <CardHeader
                action={
                    <MenuClick getOption={getOptopn} />
                }
                title={name}
                subheader={`Từ: ${minPrice}đ / ${price.unit}`}
            />
            <CardMedia
                className={classes.media}
                image={linkImg}
                title={name}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {describeProduct}
                </Typography>
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <Button variant="outlined" color="primary">
                    Xem chi tiết
                </Button>
            </CardActions>
        </Card>
    );
}
