import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, FormHelperText } from '@material-ui/core';


ChipField.propTypes = {
    price: PropTypes.array,
    deleteChip: PropTypes.func,
    onClick: PropTypes.func,
    addChip:PropTypes.bool
};

ChipField.defaultProps = {
    price: [150000, 200000],
    deleteChip: null,
    onClick: null,
    addChip:false
}

const useStyles = makeStyles({
    item: {
        marginRight: 5
    }
})

function ChipField(props) {
    const classes = useStyles();

    const { price, deleteChip, onClick, form, field, addChip } = props;

    const handleDelete = (index) => {
        deleteChip(index);
    };
    const { errors, touched } = form;
    const showError = errors[field.name] && touched[field.name]
    return (
        <>
            {
                addChip && <Chip
                    label='Thêm giá'
                    color="primary"
                    variant="outlined"
                    style={{ marginTop: 20 }}
                    icon={<AddIcon />}
                    className={classes.item}
                    onClick={onClick}
                    color={showError ? 'secondary' : 'primary'}
                />
            }
            {
                showError && <FormHelperText error>{errors[field.name]}</FormHelperText>
            }
            {
                price.map((item, index) => {

                    if (Number.isInteger(item))
                        var number = `đ${Intl.NumberFormat().format(item)}`
                    return (
                        <Chip
                            key={index}
                            label={number}
                            onDelete={() => handleDelete(index)}
                            color="primary"
                            variant="outlined"
                            style={{ marginTop: 20 }}
                            className={classes.item}
                        />

                    )
                })
            }
        </>
    );
}

export default ChipField;