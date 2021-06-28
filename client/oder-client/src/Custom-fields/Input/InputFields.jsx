import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

InputFields.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    lable: PropTypes.string,
    disabled: PropTypes.bool,
    type: PropTypes.string
};

InputFields.defaultProps = {
    lable: "No name",
    disabled: false,
    type: 'text'
}

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

function InputFields(props) {
    const { field, form, lable, disabled, type } = props
    const classes = useStyles();
    return (
        <div>
            <TextField id="outlined-basic" label={lable} variant="outlined"
                {
                ...field
                }
                disabled={disabled}
                type={type}

                style={{
                    width: '100%',
                }}
                className={classes.test}
            />
        </div>
    );
}

export default InputFields;