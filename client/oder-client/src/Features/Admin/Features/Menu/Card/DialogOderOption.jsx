import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { unwrapResult } from '@reduxjs/toolkit';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewOption, getAproduct, oderOptionAction } from './oderOptionSlice';
import CircularProgress from "@material-ui/core/CircularProgress";

DialogOderOption.propTypes = {
    keyFood: PropTypes.string,
    category: PropTypes.string,
    classify: PropTypes.string,
};

const useStyles = makeStyles((theme) => ({
    conten: {
        display: 'flex',
        flexDirection: 'row',
        width: "100%"
    },
    contenInput: {
        flex: 1,
        margin: 5
    }
}));

function DialogOderOption(props) {
    const { keyFood, category, classify, closeDialog, unit } = props;
    const classes = useStyles();

    const dispatch = useDispatch();

    useEffect(() => {
        try {
            const productAction = getAproduct({
                key: keyFood,
                category: category,
                classify: classify
            })
            const resultProduct = dispatch(productAction)
            unwrapResult(resultProduct)
        } catch (error) {

        }
    }, [])

    const { data: dataOder, loading } = useSelector(state => state.oderoption)
    const oderOption = dataOder.oderOption;

    const [state, setState] = useState({
        unit: '',
        factor: 0
    })

    const [factorErr, setFactorErr] = useState(null)
    const onChange = (event, classify) => {
        var value = event.target.value;
        if (classify === 'unit') {
            setState({
                ...state,
                unit: value
            })
        } else {
            setState({
                ...state,
                factor: value
            })
        }
    }
    const KeyDownEnter = (event) => {
        if (event.keyCode === 13) {
            if (state.factor && state.unit) {
                if (!isNaN(state.factor)) {
                    setFactorErr(null)
                    let newData;
                    const oderOption = { ...state, factor: parseFloat(state.factor) }
                    if (dataOder.oderOption) {
                        newData = { ...dataOder, oderOption: [...dataOder.oderOption, oderOption] }

                    } else {
                        const oderOption = new Array();
                        oderOption.push(state)
                        newData = { ...dataOder, oderOption: oderOption }
                    }
                    const actionLocalAddNew = addNewOption(newData)
                    dispatch(actionLocalAddNew)
                    setState({
                        unit: '',
                        factor: 0
                    })
                }
                else {
                    setFactorErr('Hệ số phải là dạng số')
                }
            }
        }
    }
    const onDelete = (index) => {
        const newOption = [...oderOption]
        newOption.splice(index, 1);
        const newData = { ...dataOder, oderOption: newOption }
        const actionLocalAddNew = addNewOption(newData)
        dispatch(actionLocalAddNew)
    }

    const clickButton = () => {
        try {
            const actionApiAddNew = oderOptionAction({
                key: keyFood,
                classify: classify,
                data: dataOder
            })
            unwrapResult(dispatch(actionApiAddNew));
        } catch (error) {

        }
        closeDialog()
    }
    return (
        <Dialog open fullWidth>
            <DialogTitle >Thiết lập Oder</DialogTitle>
            <DialogContent >
                <div className={classes.conten}>
                    <TextField
                        variant="outlined"
                        label="Đơn vị"
                        className={classes.contenInput}
                        value={state.unit}
                        onChange={(e) => { onChange(e, 'unit') }}
                    />
                    <TextField
                        variant="outlined"
                        label="Hệ số"
                        className={classes.contenInput}
                        value={state.factor}
                        onChange={(e) => { onChange(e, 'factor') }}
                        onKeyDown={KeyDownEnter}
                        error={factorErr ? true : false}
                        helperText={factorErr ? factorErr : false}
                    />
                </div>
                {
                    loading && <CircularProgress />
                }
                {
                    oderOption && oderOption.map((item, index) => {
                        return (
                            <Chip label={`${item.unit}: 1 x ${item.factor} (${unit})`} onDelete={() => onDelete(index)} key={index} />
                        )
                    })
                }

            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={clickButton}
                >Lưu lại</Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => { closeDialog() }}
                >Hủy bỏ</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogOderOption;