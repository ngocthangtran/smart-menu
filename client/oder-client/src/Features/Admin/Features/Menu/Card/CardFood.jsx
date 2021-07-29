import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { useState } from 'react';
import MenuClick from '../../../../../Components/ClickMenu/ClickMenu';
import DialogOderOption from './DialogOderOption';

RecipeReviewCard.propTypes = {
    name: PropTypes.string,
    price: PropTypes.object,
    describeProduct: PropTypes.string,
    linkImg: PropTypes.string,
    keyFood: PropTypes.string,
    classify: PropTypes.string,
    category: PropTypes.string,
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
    },
    conten: {
        display: 'flex',
        flexDirection: 'row',
        width: "100%"
    },
    contenInput: {
        flex: 1,
        margin: 5
    }
}));

export default function RecipeReviewCard(props) {
    const classes = useStyles();
    const { name, price, linkImg, describeProduct, handlingFoodCard, keyFood, classify, category } = props;
    var minPrice = Intl.NumberFormat().format(Math.min.apply(Math, price.size))

    const [open, setOpen] = useState(false)

    const getOptopn = (option) => {
        if (option === "Xóa") {
            handlingFoodCard.delete(keyFood)
        } if (option === "Sửa") {
            handlingFoodCard.repair(keyFood)
        }
        if (option === 'Cài đặt Oder') {
            setOpen(true)
        }
    }
    const closeDialog = () => {
        setOpen(false)
    }


    return (
        <Card className={classes.root}>
            {
                open && <DialogOderOption
                    classify={classify}
                    category={category}
                    keyFood={keyFood}
                    closeDialog={closeDialog}
                    unit={price.unit}
                />
            }
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
