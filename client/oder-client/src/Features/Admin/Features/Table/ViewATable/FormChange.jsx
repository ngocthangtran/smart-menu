import React from 'react';
import PropTypes from 'prop-types';
import { Formik, FastField, Form } from 'formik';
import InputField from '../../../../../Custom-fields/Input/InputFields';
import './formchange.scss'
import Button from '@material-ui/core/Button';
import { fixNumberFloat, shortenMoney } from '../../../../../utils/convertPrice';

FormChange.propTypes = {
    name: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
    sumPrice: PropTypes.number
};

FormChange.defaultProps = {
    name: 'no name',
    price: 0,
    count: 0,
    sumPrice: 0
}

function FormChange(props) {
    const { name, price, count, changeValue } = props;
    const initialValues = {
        name: name, price: price, count: count, sumPrice: shortenMoney(count * price)
    }
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(vl) => console.log(vl)}
            enableReinitialize
        >
            {
                formilProps => {
                    const { values, touched, errors } = formilProps;
                    values.sumPrice = shortenMoney(fixNumberFloat(values.count * values.price))
                    return (
                        <Form className="infoFood">
                            <FastField
                                name='name'
                                component={InputField}

                                lable="Tên món"
                                disabled={true}
                            />
                            <FastField
                                name='price'
                                component={InputField}

                                lable="Giá"
                            />
                            <FastField
                                name='count'
                                component={InputField}

                                lable="Số lượng"
                                type='number'
                            />
                            <FastField
                                name='sumPrice'
                                component={InputField}

                                lable="Tổng"
                                disabled={true}
                            />
                            <Button
                                variant="outlined"
                                color="primary"
                                type='submit'
                                style={{
                                    colol: 'black'
                                }}
                            >
                                Lưu lại
                            </Button>
                        </Form>
                    )
                }
            }
        </Formik>
    );
}

export default FormChange;