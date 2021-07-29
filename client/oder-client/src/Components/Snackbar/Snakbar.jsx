import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
Snakbar.propTypes = {

};

function Snakbar(props) {
    return (
        <Snackbar 
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={true}
            message="test"
        />
    );
}

export default Snakbar;