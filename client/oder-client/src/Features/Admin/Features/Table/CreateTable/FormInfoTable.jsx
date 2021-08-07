import { Button, TextField } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Form, Formik } from 'formik';
import PropsType from 'prop-types';
import React, { useState } from 'react';
import DialogChangeDomain from '../DialogChangeDomain/DialogChangeDomain';


const ColorButton = withStyles((theme) => ({
    root: {
        color: '#fff',
        backgroundColor: '#3498db',
        border: 'none',
        '&:hover': {
            backgroundColor: '#2980b9',
        },
    },
}))(Button);

const useStyles = makeStyles({
    name: {

    }
});

FormInfoTable.propTypes = {
    numberTable: PropsType.number,
    systemLink: PropsType.string,
    onChange: PropsType.func,
    changeSystemLink: PropsType.func,
    onSubmit: PropsType.func,
}

FormInfoTable.defaultProps = {
    numberTable: 1,
    linkQr: 'http://localhost:3000/admin/addtableeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    systemLink: window.location.href
}

function FormInfoTable(props) {

    const { numberTable, systemLink, linkOderTable, onChange, changeSystemLink, onSubmit } = props
    const initialValues = {
        numberTable, systemLink, linkOderTable
    }

    const submitForm = value => {
        const dataTable = {
            keyTable: value.linkOderTable.split('/').pop(),
            numberTable: value.numberTable,
            linkOderQr: value.linkOderTable
        }
        onSubmit(dataTable)
    }

    //Handling openDialog
    const [open, setOpen] = useState(false)

    //hading dowload qr
    const onDownload = () => {
        const canvas = document.getElementById('canvas');
        var img = canvas.toDataURL('image/png')

        let downloadLink = document.createElement('a');
        downloadLink.href = img;
        downloadLink.download = `Bàn số ${numberTable}`;
        document.body.appendChild(downloadLink);
        console.log(downloadLink)
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
    return (
        <>

            <DialogChangeDomain
                domain={systemLink}
                open={open}
                changeSystemLink={changeSystemLink}
                closeDiaLog={() => { setOpen(false) }}
            />
            <Formik
                initialValues={initialValues}
                onSubmit={submitForm}
                enableReinitialize
            >
                {
                    formikProps => {
                        const { values } = formikProps;
                        return (
                            <Form>

                                <TextField
                                    label='Bàn số'
                                    value={values.numberTable}
                                    onChange={(e) => onChange(e.target.value)}
                                    type='number'
                                />

                                <div className="input__copy">
                                    <span>Domain</span>
                                    <div className="input__conten">
                                        <div type="text"> {values.systemLink}</div>
                                        <i className='bx bx-pencil' onClick={() => { setOpen(true) }}></i>
                                    </div>
                                </div>

                                <div className="input__copy">
                                    <span>Tải xuống: </span>
                                    <ColorButton
                                        endIcon={<GetAppIcon />}
                                        variant='outlined'
                                        onClick={onDownload}
                                    >Qr</ColorButton>
                                    <div className="input__conten">
                                    </div>
                                </div>
                                <Button
                                    variant='contained'
                                    color="primary"
                                    style={{
                                        marginTop: "2rem",
                                        width: '50%',
                                        // marginTop:'auto',
                                        marginLeft: 'auto'
                                    }}
                                    type="submit"
                                >Lưu</Button>
                            </Form>
                        )
                    }
                }
            </Formik>
        </>
    );
}

export default FormInfoTable;