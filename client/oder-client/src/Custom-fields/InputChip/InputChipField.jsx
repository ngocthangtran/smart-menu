import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../Input/InputFields';
import ChipField from '../ChipField/ChipField';
import { useState } from 'react';
import { TextField } from '@material-ui/core'


InputChipField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
};

InputChipField.defaultProps = {
}

function InputFieldsAdd(props) {
    const { field, lable, disabled, type } = props
    return (
        <TextField id="outlined-basic" label={lable} variant="outlined"
            {
            ...field
            }
            onKeyDown={field.onChange}
            disabled={disabled}
            type={type}
            style={{ width: '100%' }}
        />

    );
}

function InputChipField(props) {
    const { field, form } = props;
    const { value } = field;
    const onChangeValuePrice = (index) => {
        var newValue = [...value]
        newValue.splice(index, 1)
        field.onChange({
            target: {
                name: field.name,
                value: newValue
            }
        })
    }
    const [inputValue, setInputValue] = useState('');
    const [view, setView] = useState(false);
    const onChange = (event) => {
        if (event.target.value.replace(/,/g, '')) {
            const formatNumber = parseInt(event.target.value.replace(/,/g, '')).toLocaleString()
            setInputValue(formatNumber);
        }
        else {
            setInputValue('');
        }
        if (event.keyCode === 13) {
            var newValue = [...value]
            const newPrice = parseInt(inputValue.replace(/,/g, ''));
            if (newValue.indexOf(newPrice) !== -1 || Number.isNaN(newPrice)) {
                setInputValue('');
                return
            }
            setInputValue('');
            newValue.push(newPrice)
            field.onChange({
                target: {
                    name: field.name,
                    value: newValue
                }
            })
            setView(!view)
        }
    }
    const onBlur = (event) => {

        var newValue = [...value]
        const newPrice = parseInt(inputValue.replace(/,/g, ''));
        console.log()
        if (newValue.indexOf(newPrice) !== -1 || Number.isNaN(newPrice)) {
            setInputValue('');
            return
        }
        setInputValue('');
        newValue.push(newPrice)
        field.onChange({
            target: {
                name: field.name,
                value: newValue
            }
        })
        setView(!view)
    }
    const inputField = {
        onChange,
        value: inputValue,
        onBlur: onBlur
    }
    return (
        <>
            {
                view && <InputFieldsAdd lable="Giá tiền" field={inputField} />
            }
            <ChipField price={value} deleteChip={onChangeValuePrice} onClick={() => setView(!view)} form={form} field={field} addChip={true} />
        </>
    );
}

export default InputChipField;