import React from 'react';
import Button from '@material-ui/core/Button';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import PropsType from 'prop-types';
import './index.scss'
import { shortenMoney } from '../../../../../../utils/convertPrice';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProductAction } from '../../../OderMain/oderSlice';
import CircularProgress from "@material-ui/core/CircularProgress";
import oderApi from '../../../../oderApi';

CompleteOder.propTypes = {
    sumprice: PropsType.number,
    amount: PropsType.number
}

CompleteOder.defaultProps = {
    sumprice: 0,
    amount: 0
}

function CompleteOder(props) {
    const { amount, sumprice } = props;
    const history = useHistory();

    const dispatch = useDispatch();

    const { dataOder } = useSelector(state => state.cartreducer)
    const { loading, keyTable } = useSelector(state => state.oderreducer)
    return (
        <>
            <div className='customfoodter'>
                <div className='sum'>
                    Tổng tiền thanh toán
                    <br />
                    {
                        shortenMoney(sumprice)
                    }
                    <br />
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    endIcon={loading ? <CircularProgress /> : <DoneAllIcon />}
                    style={{
                        background: "#e74c3c",
                        borderRadius: 'uset'
                    }}
                    onClick={async () => {
                        var confirmOder = { ...dataOder }
                        Object.keys(dataOder).map(items => {
                            confirmOder = { ...confirmOder, [items]: { ...confirmOder[items], confirmOder: true } }
                        })
                        const data = {
                            keyTable: keyTable,
                            dataOder: confirmOder
                        }
                        const actionAddFood = addProductAction(data);
                        dispatch(actionAddFood);
                        //check number people
                        const { data: oderData } = await oderApi.checkTableExsitInOder({ keyTable: keyTable })
                        if (!oderData.numberPeople) {
                            history.push(`input-people`)
                        }

                    }}
                >
                    Báo món ({amount})
                </Button>
            </div>
        </>
    );
}

export default CompleteOder;