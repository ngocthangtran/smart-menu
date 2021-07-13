import Button from '@material-ui/core/Button';
import { FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

InputFile.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    accept: PropTypes.string,
    type: PropTypes.string,
    lable: PropTypes.string
};

InputFile.defaultProps = {
    type: 'file',
    accept: 'image/*',
    lable: 'No name'
}

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
        height: 200
    },
}));

function InputFile(props) {
    const { field, form, accept, lable, type } = props

    const { errors, touched } = form;
    const showError = errors[field.name] && touched[field.name]
    const classes = useStyles();
    const onSelectFile = event => {
        if (event.target.files[0]) {
            field.onChange({
                target: {
                    name: field.name,
                    value: event.target.files[0]
                }
            })
        }
    }
    const onBlur = (event) => {
    }

    return (
        <>
            <input
                accept={accept}
                className={classes.input}
                id="contained-button-file"
                multiple
                type={type}
                onChange={onSelectFile}

            />
            <label htmlFor="contained-button-file" >
                <Button variant="contained"
                    style={{ width: '100%', height: '100%' }}
                    color='primary'
                    component="span"
                    endIcon={<PhotoCamera />}
                >
                    {lable}
                </Button>
                {
                    showError && <FormHelperText error>Phải có hình ảnh minh họa</FormHelperText>
                }
            </label>
        </>
    );
}

export default InputFile;