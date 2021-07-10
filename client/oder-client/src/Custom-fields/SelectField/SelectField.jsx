import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';

SelectField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    category: PropTypes.array,
    label: PropTypes.string
};

SelectField.defaultProps = {
    category: [],
    label: 'No name'
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

    const { field, form, category, label } = props;
    const { errors, touched } = form;
    const showError = errors[field.name] && touched[field.name];
    // console.log(showError)


    const handleChange = (event) => {
        field.onChange({
            target: {
                name: field.name,
                value: event.target.value
            }
        })

    };
    return (
        <>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel
                    htmlFor="outlined-age-native-simple"
                    error={showError ? true : false}
                >
                    Danh mục</InputLabel>
                <Select
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

                </Select>
                {
                    showError && <FormHelperText error>{errors[field.name]}</FormHelperText>
                }
            </FormControl>
        </>
    );
}

export default SelectField;