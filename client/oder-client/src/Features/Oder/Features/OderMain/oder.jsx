import React from 'react';
import { useState } from 'react';
import ListProduct from './Listproduct/ListProduct';
import Product from './Product/Product';
import './oder.scss'
import Foodter from '../../Components/Foodter/Foodter';
import { useSelector } from 'react-redux';
import LoadPage from '../../../../Components/LoadPage/LoadPage';
import HeaderOder from '../../Components/Header/Header';
import { useEffect } from 'react';
function Index(props) {

    const { dataFood: data, loading } = useSelector(state => state.allfood);
    const { dataDrinks: drinks, loading: loadingDrinks } = useSelector(state => state.alldrinks);

    const [activeCategory, setActiveCategory] = useState({ index: 0, classify: 'food' });
    const getCategory = (index, classify) => {
        setActiveCategory({
            index, classify
        })
    }

    //handling view food
    const [dataViewFood, setDataViewFood] = useState()
    const [activeFood, setActiveFood] = useState(0);

    //handling show icon foodter
    const [dataViewFoodter, setDataviewFoodter] = useState()
    //+click classify food
    useEffect(() => {
        if (activeCategory.classify === 'food') {
            if (data) {
                Object.keys(data).map((item, index) => {
                    if (index === activeCategory.index) {
                        return setDataviewFoodter(data[item])
                    }
                    return 1
                })
                setActiveFood(0);
            }
        }
    }, [activeCategory, data])
    //+click classify drinks
    useEffect(() => {
        if (activeCategory.classify === 'drinks') {
            if (drinks) {
                Object.keys(drinks).map((item, index) => {
                    if (index === activeCategory.index) {
                        return setDataviewFoodter(drinks[item])
                    }
                    return 1
                })
                setActiveFood(0);
            }
        }
    }, [activeCategory, drinks])

    //handlin view
    useEffect(() => {
        if (dataViewFoodter) {
            Object.keys(dataViewFoodter).map((item, index) => {
                if (activeFood === index) {
                    setDataViewFood(dataViewFoodter[item])
                }
                return 1
            })
        }
    }, [activeFood, dataViewFoodter])

    const clickItem = (index) => {
        setActiveFood(index)
    }
    return (
        <>
            {
                loading && loadingDrinks && <LoadPage />
            }
            {
                dataViewFood &&
                <>
                    <HeaderOder name="Nhà hàng hưng thịnh" active={activeCategory} getCategory={getCategory} />
                    <div className='oder-main'>
                        <Product
                            dataFood={dataViewFood}
                        />
                        <Foodter Component={<ListProduct foodCategory={dataViewFoodter} clickItem={clickItem} />} />
                    </div></>
            }
        </>
    );
}

export default Index;