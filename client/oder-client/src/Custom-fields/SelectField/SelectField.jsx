import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import DialogInput from '../../Components/DialogInput/DialogInput';

SelectField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    category: PropTypes.array,
    label: PropTypes.string,
    addNewValue: PropTypes.bool,
    disabled: PropTypes.bool
};

SelectField.defaultProps = {
    category: [],
    label: 'No name',
    addNewValue: false,
    disabled: false
}

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: '100%'
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function SelectField(props) {
    const classes = useStyles();

    const { field, form, category, label, addNewValue, disabled } = props;
    const { errors, touched } = form;
    const showError = errors[field.name] && touched[field.name];

    const [openDialog, setOpenDialog] = useState(false)
    const handleChange = (event) => {
        if (event.target.value === 'add') {
            setOpenDialog(!openDialog)
        }
        field.onChange({
            target: {
                name: field.name,
                value: event.target.value
            }
        })

    };

    const getVale = value => {
        if (value) {
            category.push(value)
            field.onChange({
                target: {
                    name: field.name,
                    value: value
                }
            })
        } else {
            field.onChange({
                target: {
                    name: field.name,
                    value: ''
                }
            })

        }
        setOpenDialog(!openDialog);
    }

    const SetOpen = () => {
        setOpenDialog(!openDialog);
        field.onChange({
            target: {
                name: field.name,
                value: ''
            }
        })
    }

    return (
        <>
            {addNewValue && <DialogInput open={openDialog} getVale={getVale} setOpen={SetOpen} />}
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel
                    htmlFor="outlined-age-native-simple"
                    error={showError ? true : false}
                >
                    {label}</InputLabel>
                <Select
                    disabled={disabled}
                    native
                    {
                    ...field
                    }
                    onChange={handleChange}
                    label={label}
                    error={showError ? true : false}

                >
                    <option aria-label="None" value="" />
                    {
                        category.map((item, index) => <option value={item} key={index}>{item}</option>)
                    }
                    {
                        addNewValue && <option value={'add'}>{`Thêm ${label}`}</option>
                    }
                </Select>
                {
                    showError && <FormHelperText error>{errors[field.name]}</FormHelperText>
                }
            </FormControl>
        </>
    );
}

export default SelectField;