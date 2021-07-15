import Dialog from "@material-ui/core/Dialog";
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core'

DialogInput.propTypes = {
    title: PropTypes.string,
    describeText: PropTypes.string,
    nameInput: PropTypes.string,

    open: PropTypes.bool,
    setOpen:PropTypes.func.isRequired,
    getVale: PropTypes.func.isRequired
};

const useStyles = makeStyles({
    input: {
        width: '30rem'
    },
});


function DialogInput(props) {
    const { open, getVale, setOpen } = props;
    const classes = useStyles()
    const [conten, setConten] = useState('');
    const onChange = (e) => {
        setConten(e.target.value)
    }
    const setValue = ()=>{
        getVale(conten)
    }
    return (
        <Dialog
            open={open}

        >
            <DialogTitle id="simple-dialog-title">Thêm danh mục</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Bạn có thể phân loại danh mục món ăn ở đây.<br />ví dụ: hấp, lẩu, nướng, ...
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Tên danh mục"
                    type="text"
                    className={classes.input}

                    value={conten}
                    onChange={onChange}
                />
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={setOpen}>
                    Hủy bỏ
                </Button>
                <Button color="primary" onClick={setValue}>
                    Lưu lại
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogInput;