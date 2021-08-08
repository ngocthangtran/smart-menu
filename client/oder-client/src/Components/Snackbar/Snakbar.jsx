import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import Alert from '@material-ui/lab/Alert';

Snakbar.propTypes = {

};

function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
}

Snackbar.defaultProps = {
    // isOpen:false
}

function Snakbar({ message, isOpen }) {

    // useEffect(() => {
    //     setTimeout(() => {
    //         setOpen(false);
    //     }, 4000);
    // })
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={isOpen}
            TransitionComponent={TransitionLeft}
        >
            <Alert severity="success" icon={false} onClose={() => { }}  >{message}</Alert>

        </Snackbar>
    );
}

export default Snakbar;