import { makeStyles } from '@material-ui/styles';
import { Formik, FastField, Form } from 'formik';
import React, { useEffect } from 'react';
import InputFields from '../../../../../Custom-fields/Input/InputFields';
import SelectField from '../../../../../Custom-fields/SelectField/SelectField';
import Header from '../../../Components/MainHeader/MainHeader';
import InputFile from '../../../../../Custom-fields/InputFile/InputFile';
import InputChipField from '../../../../../Custom-fields/InputChip/InputChipField';
import Textarea from '../../../../../Custom-fields/Textarea/Textarea';
import { Button } from '@material-ui/core'
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addfood } from './addFood';
import { unwrapResult } from '@reduxjs/toolkit';
import { database, deleteImg, storage } from '../../../../../utils/firebase';
import CircularProgress from "@material-ui/core/CircularProgress";
import { repairData } from '../../../../../APP/listFoodSlice';
import LoadPage from '../../../../../Components/LoadPage/LoadPage';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { actionRepairData } from '../MenuSlide';
import { clearSelectDrink, getDrinksAction } from '../../../../../APP/listDrinks';


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
        gridRowStart: 5,
        gridRowEnd: 7
    },
    selectUnit: {
        padding: 10,
        gridRowStart: 3,
        gridRowEnd: 4
    }
}));

function AddDrinks(props) {
    const dispatch = useDispatch()
    const classes = useStyles();
    const history = useHistory()

    const { selectDrink } = useSelector(state => state.alldrinks)

    const initialValues = selectDrink ?
        {
            name: selectDrink.name,
            unit: selectDrink.price.unit,
            listPrice: selectDrink.price.size,
            imgAsFile: selectDrink.link_img,
            category: selectDrink.category,
            descirbeFood: selectDrink.describe
        } :
        { name: '', unit: '', listPrice: [15000], imgAsFile: '', category: '', descirbeFood: '' }

    const { dataDrinks, loading, error } = useSelector(state => state.alldrinks)
    useEffect(async () => {
        if (Object.keys(dataDrinks).length === 0) {
            try {
                const action = getDrinksAction('drinks')
                const actionResult = await dispatch(action)
                const currenListFood = unwrapResult(actionResult);
            } catch (error) {
                console.log('Error get all product', error);
            }
        }
    }, [])

    //get categoty
    const [category, setCategory] = useState([])
    // setCategory
    useEffect(() => {
        if (Object.keys(dataDrinks).length !== 0) {
            setCategory(Object.keys(dataDrinks));
        } else {
            setCategory(["Bia"])
        }
        return () => {
            dispatch(clearSelectDrink());
        }
    }, [dataDrinks])


    //usign yup check validationSchema
    const validationSchema = yup.object().shape({
        name: yup.string().required('Tên món không được để trống'),
        category: yup.string().required('Bạn chưa chọn danh mục cho món ăn'),
        imgAsFile: yup.string().required('Hình ảnh còn trống'),
        unit: yup.string().required('Đơn vị tính đang bị trống'),
        listPrice: yup.array().required('Không được để trống').when('unit', {
            is: value => value === 'Phần',
            then: yup.array().min(1, 'Đơn vị tính bằng phần phải có ít nhất một giá'),
            otherwise: yup.array().max(1, 'Chỉ được một giá với đơn vị tính này').min(1, 'Giá đang bị trống')
        })
    })

    //handling clickButton submide new food
    const handlingNewSubmit = async values => {

        var { name, listPrice, imgAsFile, category, descirbeFood, unit } = values;
        if (descirbeFood.length === 0) {
            descirbeFood = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }

        //upload img to firebase
        const keyImg = database.ref('imgage').child('update').push().key;
        await storage.ref(`/images/${keyImg}`).put(imgAsFile);
        const linkImg = await storage.ref('images').child(keyImg).getDownloadURL()
            .then(fireBaseUrl => {
                return fireBaseUrl
            })

        const data = {
            "category": category,
            "name": name,
            "link_img": linkImg,
            "describe": descirbeFood,
            "price": {
                "unit": unit,
                "size": listPrice,
            }
        }

        //hading data with Api server
        let newKey;
        try {
            const action = addfood({
                data: data,
                classify: 'drinks'
            });
            const actionResult = await dispatch(action);
            const res = unwrapResult(actionResult);
            newKey = res.key
        } catch (error) {
            console.log("Error", error)
        }
        history.push('/admin/menu')
    }

    //handling on submit repair food
    const handlingRepairSubmit = async values => {

        var { name, listPrice, imgAsFile, category, descirbeFood, unit, key } = values;

        if (descirbeFood.length === 0) {
            descirbeFood = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }

        //check data img change
        let linkImg;
        if (imgAsFile !== selectDrink.link_img) {
            //delete old file img
            const err = await deleteImg(selectDrink.link_img);

            //upload new img to firebase
            const uploadTask = await storage.ref(`/images/${imgAsFile.name}`).put(imgAsFile);
            linkImg = await storage.ref('images').child(imgAsFile.name).getDownloadURL()
                .then(fireBaseUrl => {
                    return fireBaseUrl
                })
        } else {
            linkImg = imgAsFile;
        }

        const data = {
            "category": category,
            "name": name,
            "link_img": linkImg,
            "describe": descirbeFood,
            "price": {
                "unit": unit,
                "size": listPrice,
            },
            "key": key
        }

        //hading data width Api repair data server
        try {
            const actionRepair = actionRepairData({
                key: selectDrink.key,
                data: data,
                classify: 'drinks'
            });
            const result = await dispatch(actionRepair);
            unwrapResult(result);

            const actionRepairRedux = repairData({
                category: selectDrink.category,
                key: selectDrink.key,
                newData: data
            })
            unwrapResult(dispatch(actionRepairRedux))
        } catch (error) {
            console.log(error)
        }
        history.push('/admin/menu')
    }

    //handing click enter don't submid
    function onKeyDown(keyEvent) {
        if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
            keyEvent.preventDefault();
        }
    }
    return (

        <>
            <Header name='Thêm đồ uống' />
            <div className='conten'>
                {
                    loading && <LoadPage />
                }
                {
                    category.length !== 0 && <Formik
                        initialValues={initialValues}
                        onSubmit={selectDrink ? handlingRepairSubmit : handlingNewSubmit}
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

                                                lable={"Tên đồ uống"}
                                            />
                                        </div>
                                        <div className={classes.selectCategory}>
                                            <FastField
                                                name='category'
                                                component={SelectField}

                                                label="Danh mục"
                                                category={category}
                                                addNewValue={true}
                                                disabled={selectDrink ? true : false}
                                            />
                                        </div>
                                        <div className={classes.selectUnit}>
                                            <FastField
                                                name='unit'
                                                component={SelectField}

                                                label="Đơn vị tính"
                                                category={["Chai", "Lon", "Xị"]}
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
                                                src={typeof (values.imgAsFile) === 'object' ? URL.createObjectURL(values.imgAsFile) : values.imgAsFile ? values.imgAsFile : "https://xaydungannguyen.vn/wp-content/themes/consultix/images/no-image-found-360x260.png"}
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover"
                                                }}
                                                alt='null'
                                            />
                                        </div>

                                        {
                                            values.unit &&
                                            <div className={classes.lablePrice}>
                                                <FastField
                                                    name='listPrice'
                                                    component={InputChipField}
                                                />
                                            </div>
                                        }
                                        <div className={classes.textarea}>
                                            <FastField
                                                name='descirbeFood'
                                                component={Textarea}
                                                placeholder="Miêu tả đồ uống"
                                            />
                                        </div>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            disableElevation
                                            type='submit'

                                            endIcon={
                                                isSubmitting ? <CircularProgress /> : <DoneOutlineIcon />
                                            }
                                            style={{
                                                gridColumnStart: 2,
                                                // padding:10,
                                                margin: 10
                                            }}>
                                            {
                                                selectDrink ? "Lưu thay đổi" : "Thêm đồ uống"
                                            }
                                        </Button>
                                    </Form>

                                )
                            }
                        }
                    </Formik>
                }
            </div>
        </>
    );
}

export default AddDrinks;