import React from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        margin:50,
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    }
});

function LoadPage(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CircularProgress />
            Đang tải
        </div>
    );
}

export default LoadPage;