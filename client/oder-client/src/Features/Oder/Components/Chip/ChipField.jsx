import React from 'react';
import { Chip } from '@material-ui/core'
import PropsType from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { Check } from '@material-ui/icons';

ChipField.propTypes = {
    field: PropsType.object.isRequired,

    arrPrice: PropsType.array
};

const useStyles = makeStyles({
    parent: {
        marginTop: 10
    },
    selectPrice: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: "1.5rem",
        "&>div": {
            marginLeft: 10
        }
    },
    arrPrice: {
        margin: '10px 10px 0 0'

    },
})

const convertNumberPrice = (number) => {
    return `đ${Intl.NumberFormat().format(number)}`
}

function ChipField(props) {
    const { field, arrPrice } = props;

    const { value, onChange, name } = field;

    const classes = useStyles();

    const clickItemPrice = (value) => {
        onChange({
            target: {
                name: name,
                value: value
            }
        })
    }
    return (
        <div className={classes.parent}>
            <div className={classes.selectPrice} >
                Giá:
                <Chip
                    label={convertNumberPrice(value)}
                    color='secondary'
                    size='medium'
                />
            </div>
            <div>
                {
                    arrPrice.map((item, index) => {
                        return (
                            <Chip
                                className={classes.arrPrice}
                                key={index}
                                label={convertNumberPrice(item)}
                                color={value === item ? 'primary' : 'default'}
                                size='medium'
                                onClick={() => { clickItemPrice(item) }}
                                // onDelete={value === item ? () => { } : () => { }}
                                icon={value === item ? <Check /> : <></>}


                            />
                        )
                    })
                }
            </div>
        </div>
    );
}

export default ChipField;