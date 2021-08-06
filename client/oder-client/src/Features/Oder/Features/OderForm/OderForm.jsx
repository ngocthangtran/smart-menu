import React from 'react';
import PropTypes from 'prop-types';
import { FastField, Formik, Form } from 'formik';
import Amount from '../../Components/Amount/Amount';
import Chip from '../../Components/Chip/ChipField';
import { Button } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { addProductAction } from '../OderMain/oderSlice';
import { useEffect } from 'react';
import { database } from '../../../../utils/firebase';
import { useState } from 'react';

OderForm.propTypes = {
    arrPrice: PropTypes.array
};

OderForm.defaultProps = {
    arrPrice: [150000, 200000, 250000]
}

function OderForm(props) {
    const { arrPrice, oderOption, nameFood, keyFood, unit } = props

    const { keyTable } = useSelector(state => state.oderreducer)
    const dispatch = useDispatch();

    const [initialValues, setInitialValues] = useState({
        "name": nameFood,
        "key": keyFood,
        "amount": {
            amount: 1,
            oderOption: oderOption ? oderOption[0] : undefined
        },
        "selectPrice": arrPrice[0],
        "unit": unit
    })
    //GET REALTIME DATABASE
    useEffect(() => {
        database.ref(`Oder/${keyTable}/dataOder/${keyFood}`).on('value', res => {
            var data = res.val()
            if (data) {
                setInitialValues(
                    {
                        "name": data.name,
                        "key": data.key,
                        "amount": {
                            amount: data.amount.amount,
                            // oderOption: data.amount.oderOption ? data.amount.oderOption : undefined
                            oderOption: data.amount.oderOption

                        },
                        "selectPrice": data.selectPrice,
                        "unit": unit
                    }
                )
            }
        })
    }, [keyFood, keyTable, unit])

    const onSubmit = async (values) => {
        const stringJson = JSON.stringify(values)
        const dataOder = `{"${keyFood}":${stringJson}}`;

        const data = {
            keyTable: keyTable,
            dataOder: JSON.parse(dataOder)
        }

        const actionAddFood = addProductAction(data);
        dispatch(actionAddFood);
    }


    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            enableReinitialize
        >
            {
                formikProps => {
                    // console.log(values);
                    return (
                        <Form>
                            <FastField
                                name='amount'
                                component={Amount}

                                oderOption={oderOption}
                            />

                            <FastField
                                name='selectPrice'
                                component={Chip}

                                arrPrice={arrPrice}
                            />
                            <Button
                                variant='contained'
                                startIcon={<AddShoppingCartIcon />}
                                style={{
                                    backgroundColor: "#74b9ff",
                                    height: '3rem',
                                    marginTop: '20px'
                                }}
                                type='submit'
                            >Thêm món</Button>
                        </Form>

                    )
                }
            }
        </Formik>
    );
}

export default OderForm;