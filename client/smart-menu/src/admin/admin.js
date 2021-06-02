import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Status from './components/mainconten/status/status';
import Listmenu from './components/mainconten/menu/menu';

import './admin.css';


const MainConten = (props) => {
    let Conten = props.conten
    console.log(props.nameMain);
    return (
        <div className='main'>
            <div class="main-head">
                <div class="main-title">
                    {props.nameMain}
                </div>
            </div>
            <div className='main-content'>
                <Conten />
            </div>
        </div>
    )
}


class admin extends Component {
    componentDidMount() {
        document.querySelectorAll('.sidebar-submenu').forEach(e => {
            e.querySelector('.sidebar-menu-dropdown').onclick = event => {
                event.preventDefault();
                e.querySelector(".sidebar-menu-dropdown .dropdown-icon").classList.toggle('active')


                let dropdown_content = e.querySelector('.sidebar-menu-dropdown-conten')
                let dropdown_content_lis = dropdown_content.querySelectorAll('li')

                let active_height = dropdown_content_lis[0].clientHeight * dropdown_content_lis.length
                console.log(dropdown_content_lis[0].clientHeight)

                dropdown_content.classList.toggle('active')

                dropdown_content.style.height = dropdown_content.classList.contains('active') ? active_height + 'px' : '0'
            }
        })
    }
    render() {
        return (
            <Router>
                <div className="sidebar">
                    <div className="sidebar-logo">
                        <img src={process.env.PUBLIC_URL + '/asset/img/Logo-1.jpg'} alt="logo" />
                        <div className="sidebar-close">
                            <i className='bx bx-left-arrow-alt'></i>
                        </div>
                    </div>

                    <div className="sidebar-user">
                        <div className="sidebar-user-info">
                            <img src={process.env.PUBLIC_URL + '/asset/img/avt.jpg'} alt="a"/>
                            <div className="sidebar-user-name">
                                Trần Ngọc Thăng
                        </div>
                        </div>
                        <button className="btn btn-outline">
                            <i className='bx bx-log-out'></i>
                        </button>
                    </div>
                    <ul className="sidebar-menu">
                        <li>
                            <Link to='/status' className="active">
                                <i className='bx bx-home'></i>
                                <span>Trạng thái</span>
                            </Link>
                        </li>
                        <li className="sidebar-submenu">
                            <Link to='/menu' className="sidebar-menu-dropdown">
                                <i className='bx bx-food-menu'></i>
                                <span>thực đơn</span>
                                <div className="dropdown-icon">
                                </div>
                            </Link>
                            <ul className="sidebar-menu sidebar-menu-dropdown-conten">
                                <li>
                                    <Link to='/menu'>
                                        danh sách
                        </Link>
                                </li>
                                <li>
                                    <Link to='/'>
                                        Thêm món
                        </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to='/'>
                                <i className='bx bx-line-chart-down'></i>
                                <span>Biểu đồ</span>
                            </Link>
                        </li>
                        <li className="sidebar-submenu">
                            <Link to='/' className="sidebar-menu-dropdown">
                                <i className='bx bx-scan'></i>
                                <span>Bàn</span>
                                <div className="dropdown-icon">
                                </div>
                            </Link>
                            <ul className="sidebar-menu sidebar-menu-dropdown-conten">
                                <li>
                                    <Link to='/'>
                                        Tạo bàn
                        </Link>
                                </li>
                                <li>
                                    <Link to='/'>
                                        Xem Qr code bàn
                        </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to='/'>
                                <i className='bx bxs-user-pin bx-flip-horizontal'></i>
                                <span>User</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <Switch>
                    <Route exact path='/status'>
                        <MainConten nameMain="Trạng thái" conten={Status} />
                    </Route>
                    <Route exact path='/menu'>
                        <MainConten nameMain="Danh sách thực đơn" conten={Listmenu} />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default admin;