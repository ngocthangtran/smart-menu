import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import Header from '../../Components/MainHeader/MainHeader';
import CardFood from './Card/CardFood';
import PropTypes from 'prop-types';



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

CardConten.propTypes = {
    demoData: PropTypes.object
};

CardConten.defaultProps = {
    demoData: {}
}


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

const demoData = {
    "Hấp": {
        "-Mbia4p5MArVnOAgkWKf": {
            "category": "Hấp",
            "key": "-Mbia4p5MArVnOAgkWKf",
            "link_img": "https://firebasestorage.googleapis.com/v0/b/smart-menu-d89c1.appspot.com/o/images%2Fimg-9362-5272.jpg?alt=media&token=b612503d-8d94-4bbb-b5b0-170a60aab5f2",
            "name": "Dê hấp tía tô",
            "size": [
                150000,
                200000,
                250000
            ]
        },
        "-MbiaNKLs8TDXTw1gxsh": {
            "category": "Hấp",
            "key": "-MbiaNKLs8TDXTw1gxsh",
            "link_img": "https://firebasestorage.googleapis.com/v0/b/smart-menu-d89c1.appspot.com/o/images%2Fchan-de-nui-ninh-thuan-500x500.jpg?alt=media&token=0b1ac41d-b3bd-4216-9695-6e74c5aefbf6",
            "name": "Dựng dê hấp tía tô",
            "size": [
                150000,
                200000,
                250000
            ]
        }
    },
    "Lẩu": {
        "-MbiZs853bjl88-7pXQP": {
            "category": "Lẩu",
            "key": "-MbiZs853bjl88-7pXQP",
            "link_img": "https://firebasestorage.googleapis.com/v0/b/smart-menu-d89c1.appspot.com/o/images%2Fmo-quan-lau-de.jpg?alt=media&token=ffe9a2c1-b5d5-4ece-adcf-b51505dea3d0",
            "name": "Lẩu thập cẩm",
            "size": [
                150000,
                200000,
                250000
            ]
        },
        "-Mbi_19af53gE1c4sHjd": {
            "category": "Lẩu",
            "key": "-Mbi_19af53gE1c4sHjd",
            "link_img": "https://firebasestorage.googleapis.com/v0/b/smart-menu-d89c1.appspot.com/o/images%2Foriginal.jpg?alt=media&token=9e928c4c-7951-41b8-9a4a-769786fde292",
            "name": "Lẩu gà tiềm",
            "size": [
                330000
            ]
        },
        "-MbibGp6kxhBbVnJbt5-": {
            "category": "Lẩu",
            "key": "-MbibGp6kxhBbVnJbt5-",
            "link_img": "https://firebasestorage.googleapis.com/v0/b/smart-menu-d89c1.appspot.com/o/images%2Fdownload.jpg?alt=media&token=a7faf993-b1eb-4755-b7e2-61ad44999a8e",
            "name": "Lẩu hải sản",
            "size": [
                150000,
                200000,
                250000
            ]
        },
        "-MbibHeQyADu7FpPQYSU": {
            "category": "Lẩu",
            "key": "-MbibHeQyADu7FpPQYSU",
            "link_img": "https://firebasestorage.googleapis.com/v0/b/smart-menu-d89c1.appspot.com/o/images%2Fimages.jpg?alt=media&token=e1e2ff98-c065-4384-9efc-7a03723376dc",
            "name": "Lẩu xườn bầu",
            "size": [
                150000,
                200000,
                250000
            ]
        }
    },
    "Nướng": {
        "-MbiaCyTjEvMohLwgPwV": {
            "category": "Nướng",
            "key": "-MbiaCyTjEvMohLwgPwV",
            "link_img": "https://firebasestorage.googleapis.com/v0/b/smart-menu-d89c1.appspot.com/o/images%2Fdownload.jpg?alt=media&token=2fb5c8a2-5a48-4a07-8a35-4881079201d8",
            "name": "Sường cọng nướng",
            "size": [
                550000
            ]
        }
    }
}

export default function CardConten() {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [dataView, setDataView] = useState(demoData[Object.keys(demoData)[0]])
    
    const handleChange = (event, newValue) => {

        // console.log(event.target.outerText)
        setDataView(demoData[Object.keys(demoData).find(key => key === event.target.outerText)])
        setValue(newValue);
    };

    return (
        <>
            <Header name='Thực đơn' />
            <div className='conten' >
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
                            Object.keys(dataView).map((item, index) => {
                                return (
                                    <Grid item xs={4}>
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
            </div>
        </>
    );
}
