import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles'
import Menu from '../Menu/Menu';


const useStyle = makeStyles({
    parent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: '1.5rem'
    },
    groupButton: {
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 10
    },
    button: {
        margin: '0 2px',
        border: '1px solid black',
        width: '2em',
        height: '2em',
        display: 'flex',
        alignItems: 'center', justifyContent: "center"
    },
    test: {
        outline: 'none',
        backgroundColor: 'black'
    }
})

Amount.propTypes = {

};

function Amount(props) {
    const { field, form, oderOption } = props;
    const classes = useStyle();

    const { value } = field;
    const minus = () => {
        if (value.amount === 1) return
        const newValue = { ...value, amount: value.amount - 1 };
        field.onChange({
            target: {
                name: field.name,
                value: newValue
            }
        })
    }
    const plus = () => {
        const newValue = { ...value, amount: value.amount + 1 };
        field.onChange({
            target: {
                name: field.name,
                value: newValue
            }
        })
    }

    const onChangeFactor = (item) => {
        const newValue = { ...value, oderOption: item };
        field.onChange({
            target: {
                name: field.name,
                value: newValue
            }
        })
    }


    return (
        <div className={classes.parent}>
            <div className={classes.title}>
                Số lượng:
            </div>
            <div className={classes.groupButton}>
                <div className={classes.button}
                    onClick={minus}
                >-</div>
                <div className={classes.button}>
                    {field.value.amount}
                </div>
                <div className={classes.button}
                    onClick={plus}
                >+</div>
            </div>
            {
                oderOption &&
                <Menu oderOption={oderOption} onChangeFactor={onChangeFactor} selectItem={value.oderOption} />
            }
        </div>
    );
}

export default Amount;