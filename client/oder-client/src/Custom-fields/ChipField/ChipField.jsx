import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, FormHelperText } from '@material-ui/core';


ChipField.propTypes = {
    price: PropTypes.array,
    deleteChip: PropTypes.func,
    onClick: PropTypes.func
};

ChipField.defaultProps = {
    price: [150000, 200000],
    deleteChip: null,
    onClick: null

}

const useStyles = makeStyles({
    item: {
        marginRight: 5
    }
})

function ChipField(props) {
    const classes = useStyles();

    const { price, deleteChip, onClick, form, field } = props;

    const handleDelete = (index) => {
        deleteChip(index);
    };
    const { errors, touched } = form;
    const showError = errors[field.name] && touched[field.name]
    return (
        <>
            <Chip
                label='Thêm giá'
                color="primary"
                variant="outlined"
                style={{ marginTop: 20 }}
                icon={<AddIcon />}
                className={classes.item}
                onClick={onClick}
                color={showError ? 'secondary' : 'primary'}
            />
            {
                showError && <FormHelperText error>Phải có ít nhất một giá trong sản phẩm</FormHelperText>
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