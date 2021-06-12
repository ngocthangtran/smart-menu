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
    // useEffect(() => {
    //     const navLink = document.querySelectorAll('.nav-link');
    //     function linkAction() {
    //         /*Active link*/
    //         navLink.forEach(n => n.classList.remove('active'));
    //         navLink.forEach(n => console.log(n));

    //         this.classList.add('active');
    //     }
    //     navLink.forEach(n => n.addEventListener('click', linkAction));
    // })

    // handing click class: header-toggle
    const [isClickToggle, setIsClickToggle] = useState(false)
    const onClickToggle = () => {
        setIsClickToggle(!isClickToggle)
    }

    //handling onclik link
    const onClickLink = ()=>{
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
                                            {/* {
                                                category[index]=== categoryName&&
                                            } */}
                                            <Link to={`/?category=${item}`}
                                                className={classNames('nav-link', { 'active': categoryName ===category[index]})} 
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
    return (
        <div className="cards-food">
            {
                Object.keys(data).length === 0 && <div>No product</div>
            }
            {
                Object.keys(data).length !== 0 && Object.keys(data).map(item => {
                    return (
                        <Card product={data[item]} key={data[item].key} />
                    )
                })
            }
        </div>
    )
}

const Card = (props) => {

    const [clickCardFood, setClickCardFood] = useState(false);
    const { category, link_img, name, side } = props.product
    var sizeMax = Math.max(...side)
        , sizeMin = Math.min(...side)

    function onclickCardFood() {
        setClickCardFood(!clickCardFood)
    }
    useEffect(() => {
    })
    return (
        <div className="card-food" onClick={onclickCardFood}>
            <div className="card-food-info">
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
                    <div className="plus">
                        -
                    </div>
                    <div className="number-count">
                        2
                    </div>
                    <div className="minus">
                        +
                    </div>
                </div>
                <div className="btn-price">
                    {
                        side.map((item, index) => {
                            return (
                                <div className="btn btn-price" key={index}>
                                    {shortenMoney(item)}
                                </div>
                            )
                        })
                    }
                </div>
                <div className="btn seleter">
                    Lưu lựa chọn
                </div>
            </div>
        </div>
    )
}

const ShopCard = (props) => {
    return (
        <div className="shop-cart">
            <div className="icon-show">
                <i className='bx bx-chevron-up'></i>
            </div>
            <div className="shop-cart-conten">
                <div className="item">
                    <i className='bx bx-x'></i>
                    <img src="https://cdn.caythuocdangian.com/2019/05/de-hap-la-tia-to.jpg"
                        alt=""></img>
                </div>
            </div>
        </div>
    )
}


function Oder(props) {
    const [products, setProducts] = useState(0),
        [category, setCategory] = useState({})

    useEffect(() => {
        database.ref('product').on('value', (listProduct) => {
            var data = listProduct.val()
            if (data) {
                setCategory(Object.keys(data).map(k => k))
                setProducts(Object.keys(data).map(k => data[k]))
            }
        })
    }, [])
    return (
        <Router>
            <Header category={category} />
            <Conten category={category} />
            <ShopCard />
        </Router>
    );
}

export default Oder;