import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
// import {BrowserRouter as Router, Link, } from 'react-router-dom'

import './oder.css'

const Header = (props) => {
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
                            {/* <li className="nav-item"><a href="" className="nav-link active">Hấp</a></li>
                            <li className="nav-item"><a href="" className="nav-link"></a>Nướng</li>
                            <li className="nav-item"><a href="" className="nav-link"></a>Xào</li>
                            <li className="nav-item"><a href="" className="nav-link"></a>Lẩu</li>
                            <li className="nav-item"><a href="" className="nav-link"></a>Đồ uống</li> */}

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}



const Conten = (props) => {
    const arr = [1, 2, 3, 4]
    return (
        <div className="cards-food">
            {
                arr.map((el, i) => {
                    return (
                        <Card number={el} key={i}/>
                    )
                })
            }
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
            <div className={classNames('card-details',{'active':clickCardFood})}  >
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

const ShowCard = (props)=>{
    return(
        <div class="shop-cart">
        <div class="icon-show">
            <i class='bx bx-chevron-up'></i>
        </div>
        <div class="shop-cart-conten">
            <div class="item">
                <i class='bx bx-x'></i>
                <img src="https://cdn.caythuocdangian.com/2019/05/de-hap-la-tia-to.jpg"
                    alt=""></img>
            </div>
        </div>
    </div>
    )
}


function oder(props) {
    return (
        <>
            <Header />
            <Conten />
            <ShowCard/>
        </>
    );
}

export default oder;