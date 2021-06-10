import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { database } from '../utils/firebase';
import { BrowserRouter as Router, Link, Route, Switch, useLocation } from 'react-router-dom'

import './oder.css'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Header = (props) => {
    const { category } = props;

    let query = useQuery()
    const categoryName = query.get('category')
    console.log(categoryName)

    useEffect(() => {
        const togglee = document.getElementById('header-menu'),
            nav = document.getElementById('nav-menu');
        togglee.addEventListener('click', () => {
            nav.classList.toggle('show')
            togglee.classList.toggle('bx-x')
        })

    })
    return (
        <div className="header">
            <a href="#" className="header-logo">
                Nhà hàng Hưng Thịnh
        </a>

            <div className="header-toggle">
                <i className='bx bx-menu' id='header-menu'></i>
            </div>

            <nav className="nav" id='nav-menu'>
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
                                Object.keys(category).length != 0 && category.map((item, index) => {
                                    return (
                                        <li className="nav-item" key={index}>
                                            <Link to={`/?category=${item}`} className="nav-link active">{item}</Link>
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

    


    return (
        <div className="cards-food">
            <Card />
        </div>
    )
}

const Card = (props) => {

    const [clickCardFood, setClickCardFood] = useState(false);

    function onclickCardFood() {
        setClickCardFood(!clickCardFood)
    }
    useEffect(() => {
    })
    return (
        <div className="card-food" onClick={onclickCardFood}>
            <div className="card-food-info">
                <img src="https://cdn.caythuocdangian.com/2019/05/de-hap-la-tia-to.jpg" alt="" className="card-image"></img>
                <div className="card-conten">
                    <div className="food-info">
                        Dê hấp xả tía tô
                        <br></br>
                        (150k -200k)
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
                    <div className="btn btn-price">
                        150k
                    </div>
                    <div className="btn btn-price">
                        200k
                    </div>
                </div>
                <div className="btn seleter">
                    Lưu lựa chọn
                </div>
            </div>
        </div>
    )
}

const ShowCard = (props) => {
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
            <Conten />
            <ShowCard />
        </Router>
    );
}

export default Oder;