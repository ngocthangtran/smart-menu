import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';


InputFields.propTypes = {
    field: PropTypes.object,
    form: PropTypes.object,

    lable: PropTypes.string,
    disabled: PropTypes.bool,
    type: PropTypes.string
};

InputFields.defaultProps = {
    lable: "No name",
    disabled: false,
    type: 'text'
}



function InputFields(props) {
    const { field, form, lable, disabled, type } = props
    const { errors, touched } = form;
    const showErrors = errors[field.name] && touched[field.name]

    return (
        <TextField id="outlined-basic" label={lable} variant="outlined"
            {
            ...field
            }
            onKeyDown={field.onChange}
            disabled={disabled}
            type={type}
            style={{ width: '100%' }}
            error={showErrors ? true : false}
            helperText={showErrors ? errors[field.name] : ''}
        />

    );
}

export default InputFields;
