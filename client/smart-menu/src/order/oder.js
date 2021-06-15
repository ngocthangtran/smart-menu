import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { database } from '../utils/firebase';
import { BrowserRouter as Router, Link, Route, Switch, useLocation } from 'react-router-dom'

import './oder.css'
import { shortenMoney } from '../utils/shortenMoney';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Header = (props) => {
    const { category } = props;
    const query = useQuery()
    const categoryName = query.get('category')

    // handing click class: header-toggle
    const [isClickToggle, setIsClickToggle] = useState(false)
    const onClickToggle = () => {
        setIsClickToggle(!isClickToggle)
    }

    //handling onclik link
    const onClickLink = () => {
        setIsClickToggle(!isClickToggle)
    }
    return (
        <div className="header">
            <a href="#" className="header-logo">
                Nhà hàng Hưng Thịnh
            </a>

            <div className="header-toggle" onClick={onClickToggle}>
                <i className='bx bx-menu' id='header-menu'></i>
            </div>

            <nav className={classNames('nav', { 'show': isClickToggle })} id='nav-menu'>
                <div className="nav-conten bg-gril">
                    <div className="nav-perfil">
                        <div className="nav-img">
                            <img src="./logoHT.png" alt="logo"></img>
                        </div>
                        <div className="nav-name">Bàn 1</div>

                    </div>
                    <div className="nav-menu">
                        <ul className="nav-list">
                            {
                                Object.keys(category).length !== 0 && category.map((item, index) => {
                                    return (
                                        <li className="nav-item" key={index}>
                                            <Link to={`/?category=${item}`}
                                                className={classNames('nav-link', { 'active': categoryName === category[index] })}
                                                onClick={onClickLink}>
                                                {item}
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}



const Conten = (props) => {
    let query = useQuery()
    const categoryName = query.get('category')
    const [data, setData] = useState({})
    var ref = `product/${categoryName != null ? categoryName : props.category[0]}`
    useEffect(() => {
        database.ref(ref).on("value", res => {
            if (res.val()) {
                setData(res.val())
            }
        })
    }, [ref])

    //hading data oder
    const postData = (data) => {
        props.getDataOder(data)
    }

    return (
        <div className="cards-food">
            {
                Object.keys(data).length === 0 && <div>No product</div>
            }
            {
                Object.keys(data).length !== 0 && Object.keys(data).map(item => {
                    return (
                        <Card product={data[item]} key={data[item].key} postData={postData} />
                    )
                })
            }
        </div>
    )
}



const Card = (props) => {
    //handling click food-card-info
    const [clickCardFood, setClickCardFood] = useState(false);
    const { link_img, name, side, key } = props.product
    var sizeMax = Math.max(...side)
        , sizeMin = Math.min(...side)
    function onclickCardFood() {
        setClickCardFood(!clickCardFood)
    }

    //handling counter
    const [count, setCount] = useState(1);
    const clickPlus = () => {
        setCount(count + 1)
    }
    const clickMinus = () => {
        if (count === 0) return
        setCount(count - 1)
    }

    //handling select prices
    const [prices, setPrices] = useState(0)
    const [select, setSelect] = useState(new Array(side.length).fill(false))
    const pushItem = (itemSelect) => {
        setPrices(itemSelect)
        const newSelect = []
        side.map((item, index) => {
            if (item === itemSelect) {
                newSelect.push(true)
            }
            newSelect.push(false)
        })
        setSelect(
            newSelect
        )
    }

    //handling btn select
    const clickBtnSleter = () => {
        const item = {
            name: name,
            sl: count,
            price: prices,
            key: key,
            link_img: link_img
        }
        props.postData(item)
        setClickCardFood(!clickCardFood)
    }
    return (
        <div className="card-food">
            <div className="card-food-info" onClick={onclickCardFood}>
                <img src={link_img} alt="" className="card-image"></img>
                <div className="card-conten">
                    <div className="food-info">
                        {name}
                        <br></br>
                        {
                            `${shortenMoney(sizeMin)}-${shortenMoney(sizeMax)}`
                        }
                    </div>
                </div>
            </div>
            <div className={classNames('card-details', { 'active': clickCardFood })}  >
                <div className="count">
                    <div className="minus" onClick={clickMinus}>
                        -
                    </div>
                    <div className="number-count">
                        {count}
                    </div>
                    <div className="plus" onClick={clickPlus}>
                        +
                    </div>
                </div>
                <div className="btn-price">
                    {
                        side.map((item, index) => {
                            return (
                                <ListPrice item={item} key={index} pushItem={pushItem} select={select[index]} />
                            )
                        })
                    }
                </div>
                <div className="btn seleter" onClick={clickBtnSleter}>
                    Lưu lựa chọn
                </div>
            </div>
        </div>
    )
}


const ListPrice = (props) => {
    const { item, pushItem, select } = props
    const selectPrice = (item) => {
        pushItem(item)
    }
    return (
        <div
            className={classNames('btn btn-price', { 'active': select })}
            onClick={() => {
                selectPrice(item)
            }} >
            {shortenMoney(item)}
        </div>
    )
}

const ShopCard = (props) => {
    const { data } = props;
    return (
        <div className="shop-cart">
            <div className="icon-show">
                <i className='bx bx-chevron-up'></i>
            </div>
            <div className="shop-cart-conten">
                {
                    data.map((item, index) => {
                        return (
                            <div className="item" key={index}>
                                <i className='bx bx-x'></i>
                                <img src={item.link_img}
                                    alt=""></img>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

function Oder(props) {
    const [products, setProducts] = useState(0),
        [category, setCategory] = useState({});

    //handling shop card
    useEffect(() => {
        database.ref('product').on('value', (listProduct) => {
            var data = listProduct.val()
            if (data) {
                setCategory(Object.keys(data).map(k => k))
                setProducts(Object.keys(data).map(k => data[k]))
            }
        })

    }, [])

    //handling data oder
    const [datasOder, setDataOder] = useState([]);
    const getDataOder = (data) => {
        const newDataOder = [...datasOder]
        newDataOder.push(data);
        setDataOder(newDataOder)

    }

    return (
        <Router>
            <Header category={category} />
            <Conten category={category} getDataOder={getDataOder} />
            <ShopCard data={datasOder} />
        </Router>
    );
}

export default Oder;