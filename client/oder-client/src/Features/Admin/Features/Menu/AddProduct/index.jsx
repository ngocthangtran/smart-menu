import { makeStyles } from '@material-ui/styles';
import { Formik, FastField, Form } from 'formik';
import React from 'react';
import InputFields from '../../../../../Custom-fields/Input/InputFields';
import SelectField from '../../../../../Custom-fields/SelectField/SelectField';
import Header from '../../../Components/MainHeader/MainHeader';
import InputFile from '../../../../../Custom-fields/InputFile/InputFile';
import InputChipField from '../../../../../Custom-fields/InputChip/InputChipField';
import Textarea from '../../../../../Custom-fields/Textarea/Textarea';
import { Button } from '@material-ui/core'
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { addfood } from './addFood';
import { unwrapResult } from '@reduxjs/toolkit';
import { storage } from '../../../../../utils/firebase';
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
    form: {
        display: "grid",
        gridTemplateColumns: 'repeat(2,1fr)',
        backgroundColor: '#fff',
        margin: 10,
        padding: 10
    },
    inputName: {
        padding: 10,
        width: "100%",
        gridColumnEnd: 3,
        gridColumnStart: 1
    },
    selectCategory: {
        padding: 10,
        width: '100%'
    },
    img: {
        padding: 10,
        gridColumnStart: 2,
        gridRowStart: 3,
        gridRowEnd: 6
    },
    inputImage: {
        padding: 10
    },
    inputPrice: {
        padding: 10,
        gridRowStart: 3,
    },
    lablePrice: {
        padding: 10,

    },
    describeFood: {
        padding: 10
    },
    textarea: {
        padding: 10,
        // border:'1px solid black',
        gridRowStart: 4,
        gridRowEnd: 6
    },

}));

const categoryDemo = ["Hấp", "Lẩu", "Nướng", "Luộc", "Chiên", "Xào"]

function Index(props) {
    const classes = useStyles();
    const initialValues = {
        name: '', price: '', listPrice: [150000, 250000, 300000], imgAsFile: '', category: '', descirbeFood: ''
    }
    const dispatch = useDispatch();
    const validationSchema = yup.object().shape({
        name: yup.string().required('Tên món không được để trống'),
        category: yup.string().required('Bạn chưa chọn danh mục cho món ăn'),
        imgAsFile: yup.string().required('Hình ảnh còn trống'),
        listPrice: yup.array().min(1, 'Sản phẩm phải có ít nhất một giá')
    })

    const handlingSubmit = async values => {

        var { name, listPrice, imgAsFile, category, descirbeFood } = values;
        if (descirbeFood.length === 0) {
            descirbeFood = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }
        const uploadTask = await storage.ref(`/images/${imgAsFile.name}`).put(imgAsFile);
        const linkImg = await storage.ref('images').child(imgAsFile.name).getDownloadURL()
            .then(fireBaseUrl => {
                return fireBaseUrl
            })

        const data = {
            "category": category,
            "name": name,
            "link_img": linkImg,
            "describe": descirbeFood,
            "size": listPrice
        }

        try {
            const action = addfood(data);
            const actionResult = await dispatch(action);
            unwrapResult(actionResult);
        } catch (error) {
            console.log("Error", error)
        }

    }
    function onKeyDown(keyEvent) {
        if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
            keyEvent.preventDefault();
        }
    }

    return (

        <>
            <Header name='Thêm thực đơn' />
            <div className='conten'>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handlingSubmit}
                    validationSchema={validationSchema}
                >
                    {
                        formikProps => {
                            const { values, isSubmitting } = formikProps;
                            return (
                                <Form className={classes.form} onKeyDown={onKeyDown}>
                                    <div className={classes.inputName}>
                                        <FastField
                                            name='name'
                                            component={InputFields}

                                            lable={"Tên món ăn"}
                                        />
                                    </div>
                                    <div className={classes.selectCategory}>
                                        <FastField
                                            name='category'
                                            component={SelectField}

                                            lable="Danh mục"
                                            category={categoryDemo}
                                        />
                                    </div>
                                    <div className={classes.inputImage}>
                                        <FastField
                                            name='imgAsFile'
                                            component={InputFile}

                                            lable='Chọn ảnh minh họa'
                                        />
                                    </div>
                                    <div className={classes.img}>
                                        <img
                                            src={values.imgAsFile ? URL.createObjectURL(values.imgAsFile) : "https://xaydungannguyen.vn/wp-content/themes/consultix/images/no-image-found-360x260.png"}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover"
                                            }}
                                            alt='null'
                                        />
                                    </div>
                                    <div className={classes.lablePrice}>
                                        <FastField
                                            name='listPrice'
                                            component={InputChipField}
                                        />
                                    </div>
                                    <div className={classes.textarea}>
                                        <FastField
                                            name='descirbeFood'
                                            component={Textarea}
                                            placeholder="Miêu tả món ăn"
                                        />
                                    </div>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        disableElevation
                                        type='submit'
                                        
                                        endIcon={
                                            isSubmitting ? <CircularProgress/> :<DoneOutlineIcon />
                                        }
                                        style={{
                                            gridColumnStart: 2,
                                            // padding:10,
                                            margin: 10
                                        }}>
                                        Thêm món ăn
                                    </Button>
                                </Form>

                            )
                        }
                    }
                </Formik>
            </div>
        </>
    );
}

export default Index;