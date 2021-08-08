import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss'
import { Image } from '../../../../Constants/Image';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoadPage from '../../../../Components/LoadPage/LoadPage';
import Cookie from 'js-cookie';
import Cookies from 'js-cookie';

Header.propTypes = {
    name: PropTypes.string,
    category: PropTypes.array
};

Header.defaultProps = {
    name: 'Name: Unnamed',
    category: []
}

function Header(props) {
    const { name, active, getCategory } = props
    const [activeMenuTongle, setActive] = useState(false);
    const activeMenu = () => {
        setActive(!activeMenuTongle)
    }
    const [heightCard, setHeightCard] = useState('')
    const [categoryFood, setCategoryFood] = useState([]);
    const [categoryDrinks, setCategoryDrinks] = useState([]);

    const { dataFood, loading, error } = useSelector(state => state.allfood);
    const { dataDrinks, loadingDrink, errorDrinks } = useSelector(state => state.alldrinks);

    var desk = Cookies.get('table')
    if (desk) {
        desk = JSON.parse(desk);
    }else{
        desk={
            table:1,
            code:12345
        }
    }


    useEffect(() => {
        const dataCovertFood = []
        if (!loading) {
            Object.keys(dataFood).map(item => {
                dataCovertFood.push({
                    category: item,
                    categoryImg: dataFood[item][Object.keys(dataFood[item])[0]]['link_img']
                })
                return 1
            })
            setCategoryFood(dataCovertFood)
        }
        const dataCovertDrinks = []
        if (!loadingDrink) {
            Object.keys(dataDrinks).map(item => {
                dataCovertDrinks.push({
                    category: item,
                    categoryImg: dataDrinks[item][Object.keys(dataDrinks[item])[0]]['link_img'],
                    length: Object.keys(dataDrinks[item]).length
                })
                return 1;
            })
            setCategoryDrinks(dataCovertDrinks)
        }
        if (document.querySelector('.menu__food__card')) {
            setHeightCard(document.querySelector('.menu__food__card').offsetWidth * 1.5)
        }
    }, [dataFood, dataDrinks, loading, loadingDrink])
    return (
        <header className="header">
            <div className="header__title">
                <img src={Image.logo} className="header__logo" alt="logo not found"></img>
                <h2 className="header__name">{name}</h2>
            </div>
            <div className={activeMenuTongle ? "header__menu active" : "header__menu"}>
                <div className="tableoder">
                    <div>
                        <i className='bx bxl-codepen' ></i>
                        Bàn số: {desk.table}
                    </div>
                    <span>
                        <i className='bx bx-pencil' ></i>
                        Code: {desk.code}
                    </span>
                </div>
                {/* <div className={"header__menu active"}> */}
                <div className="menu__food__list">
                    <h1 style={{ padding: "0 10px" }}>Danh mục đồ ăn</h1>
                    <div className="menu__food">
                        {
                            error && <div>Lỗi tải dự liệu! Báo với nhân viên phục vụ</div>
                        }
                        {
                            loading ? <LoadPage /> :
                                categoryFood && categoryFood.map((item, index) => {
                                    return (
                                        <div className={active.index === index && active.classify === 'food' ? "menu__food__card active" : "menu__food__card"}
                                            style={{ height: heightCard }}
                                            onClick={() => {
                                                setActive(!activeMenuTongle)
                                                setTimeout(() => {
                                                    getCategory(index, 'food')
                                                }, 200);
                                            }}
                                            key={index}>
                                            <img src={item.categoryImg} alt="" />
                                            <div className="menu__food__card__name">
                                                {item.category}
                                            </div>
                                        </div>
                                    )

                                })
                        }
                    </div>
                </div>
                <div className="menu__drinks__list">
                    <h1 style={{ padding: "0 10px" }}>
                        Danh mục Đồ uống
                    </h1>
                    <div className="menu__drinks">
                        {
                            errorDrinks && <div>Lỗi tải dự liệu! Báo với nhân viên phục vụ</div>
                        }
                        {
                            loadingDrink ? <LoadPage /> :
                                categoryDrinks && categoryDrinks.map((item, index) => {
                                    return (
                                        <div className={active.index === index && active.classify === 'drinks' ? "menu__drinks__card active" : "menu__drinks__card"}
                                            onClick={() => {
                                                setActive(!activeMenuTongle)
                                                setTimeout(() => {
                                                    getCategory(index, 'drinks')
                                                }, 200);
                                            }}
                                            key={index}
                                        >
                                            <img src={item.categoryImg} alt="" />
                                            <div className="menu__drinks__card__detail">
                                                <h3>{item.category}</h3>
                                                <span>{item.length} Loại</span>
                                            </div>
                                        </div>
                                    )
                                })
                        }
                    </div>

                </div>

            </div>
            <div className="header__toggle" onClick={activeMenu}>
                <i className='bx bx-menu'></i>
            </div>
        </header>
    );
}

export default Header;