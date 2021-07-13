import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import { unwrapResult } from '@reduxjs/toolkit';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { object } from 'yup/lib/locale';
import LoadPage from '../../../../Components/LoadPage/LoadPage';
import Header from '../../Components/MainHeader/MainHeader';
import CardFood from './Card/CardFood';



const AntTabs = withStyles({
    root: {
        borderBottom: '1px solid #e8e8e8',
    },
    indicator: {
        backgroundColor: '#1890ff',
    },
})(Tabs);

const AntTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(4),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            color: '#40a9ff',
            opacity: 1,
        },
        '&$selected': {
            color: '#1890ff',
            fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
            color: '#40a9ff',
        },
    },
    selected: {},
}))((props) => <Tab disableRipple {...props} />);


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    padding: {
        padding: theme.spacing(1),
    },
    tab: {
        backgroundColor: '#fff'
    },
    contenTab: {
        padding: theme.spacing(1)
    },
    grid: {
        display: 'flex',
        paddingLeft: 10
    }
}));


export default function CardConten(props) {
    const classes = useStyles();

    const [value, setValue] = useState(0);
    const { data: demoData, loading, error } = useSelector(state => state.allfood)
    const [dataView, setDataView] = useState({})
    useEffect(() => {
        if (Object.keys(demoData).length !== 0) {
            setDataView(demoData[Object.keys(demoData)[0]])
        }
    }, [demoData])
    const handleChange = (event, newValue) => {
        setDataView(demoData[Object.keys(demoData).find(key => key === event.target.outerText)])
        setValue(newValue);
    };

    return (
        <>
            <Header name='Thực đơn' />
            <div className='conten' >
                {
                    loading && <LoadPage />
                }
                {
                    error&&<div>{error.message}</div>
                }
                {
                    Object.keys(demoData).length !== 0 && <>
                        <AntTabs value={value} onChange={handleChange} aria-label="ant" className={classes.tab}>
                            {
                                Object.keys(demoData).map((item, index) => {
                                    return (
                                        <AntTab label={item} key={index} />
                                    )
                                })
                            }
                        </AntTabs>
                        <Typography className={classes.padding} />
                        <div className={classes.contenTab}>
                            <Grid container spacing={2} className={classes.grid}>
                                {
                                    Object.keys(dataView).length !== 0 && Object.keys(dataView).map((item, index) => {
                                        return (
                                            <Grid item xs={4} key={index}>
                                                <CardFood
                                                    name={dataView[item].name}
                                                    price={dataView[item].size}
                                                    linkImg={dataView[item].link_img}
                                                    describeProduct={dataView[item].describeProduct}
                                                />
                                            </Grid>
                                        )

                                    })
                                }
                            </Grid>
                        </div>
                    </>
                }

            </div>
        </>
    );
}
