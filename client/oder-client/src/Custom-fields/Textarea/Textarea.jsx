import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

Textarea.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    placeholder: PropTypes.string
};

Textarea.defaultProps = {
    placeholder: "no name"
}
const useStyles = makeStyles((theme) => ({
    root:{
        '&>div':{
            height:'100%'
        }
    }
}));
function Textarea(props) {
    const { field, form, placeholder } = props;
    const classes = useStyles();
    return (
        <TextField
            variant="outlined"
            label={placeholder}
            multiline
            rows={10}
            style={{ width: "100%", height: '100%' }}
            className={classes.root}
            {...field}
        />
    );
}

export default Textarea;