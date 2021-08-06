import React from 'react';
import PropTypes from 'prop-types';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,

    Button,

    TextField,

    makeStyles,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';

const useStyle = makeStyles({
    Title: {
        "&>h2": {
            display: 'flex',
            alignItems: 'center',
            "&>svg": {
                marginLeft: 5
            }
        },
    }
})

DialogChangeDomain.propTypes = {
    open: PropTypes.bool,
    domain: PropTypes.string
};
DialogChangeDomain.defaultProps = {
    open: false,
    domain: ''
}


function DialogChangeDomain(props) {
    const classes = useStyle();
    const { open, domain, changeSystemLink, closeDiaLog } = props;
    return (
        <Dialog open={open}>
            <DialogTitle className={classes.Title}
            >
                Thay đổi Domain
                <CreateIcon />
            </DialogTitle>

            <DialogContent>
                <TextField
                    variant="outlined"
                    label="Domain của bạn"
                    style={{
                        width: '30rem'
                    }}
                    value={domain}
                    onChange = {(e)=>{changeSystemLink(e.target.value)}}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>{closeDiaLog()}}>Hoàn tất</Button>
            </DialogActions>

        </Dialog>
    );


}

export default DialogChangeDomain;