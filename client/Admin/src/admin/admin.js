import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation
} from "react-router-dom";

import Status from './components/status/status';
import Listmenu from './components/menu/menu';
import AddNewFood from './components/menu/addnewfood';

import './admin.css';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const MainConten = (props) => {
    let Conten = props.conten
    let query = useQuery()
    const category = query.get('category'), key = query.get('key')
    console.log(category)
    return (
        <div className='main'>
            <div className="main-head">
                <div className="main-title">
                    {props.nameMain}
                </div>
            </div>
            <div className='main-content'>
                <Conten
                    category={category}
                    productKey={key} />
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
                // console.log(dropdown_content_lis[0].clientHeight)

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
                            <img src={process.env.PUBLIC_URL + '/asset/img/avt.jpg'} alt="a" />
                            <div className="sidebar-user-name">
                                Tr???n Ng???c Th??ng
                        </div>
                        </div>
                        <button className="btn btn-outline">
                            <i className='bx bx-log-out'></i>
                        </button>
                    </div>
                    <ul className="sidebar-menu">
                        <li>
                            <Link to='/' className="active">
                                <i className='bx bx-home'></i>
                                <span>Tr???ng th??i</span>
                            </Link>
                        </li>
                        <li className="sidebar-submenu">
                            <Link to='/menu' className="sidebar-menu-dropdown">
                                <i className='bx bx-food-menu'></i>
                                <span>th???c ????n</span>
                                <div className="dropdown-icon">
                                </div>
                            </Link>
                            <ul className="sidebar-menu sidebar-menu-dropdown-conten">
                                <li>
                                    <Link to='/menu'>
                                        danh s??ch
                        </Link>
                                </li>
                                <li>
                                    <Link to='/food'>
                                        Th??m m??n
                        </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to='/'>
                                <i className='bx bx-line-chart-down'></i>
                                <span>Bi???u ?????</span>
                            </Link>
                        </li>
                        <li className="sidebar-submenu">
                            <Link to='/' className="sidebar-menu-dropdown">
                                <i className='bx bx-scan'></i>
                                <span>B??n</span>
                                <div className="dropdown-icon">
                                </div>
                            </Link>
                            <ul className="sidebar-menu sidebar-menu-dropdown-conten">
                                <li>
                                    <Link to='/'>
                                        T???o b??n
                        </Link>
                                </li>
                                <li>
                                    <Link to='/'>
                                        Xem Qr code b??n
                        </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to='/test/123456'>
                                <i className='bx bxs-user-pin bx-flip-horizontal'></i>
                                <span>User</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <Switch>
                    <Route exact  path='/'>
                        <MainConten nameMain="Tr???ng th??i" conten={Status} />
                    </Route>
                    <Route exact path='/menu'>
                        <MainConten nameMain="Danh s??ch th???c ????n" conten={Listmenu} />
                    </Route>
                    <Route exact path='/food'>
                        <MainConten nameMain="Th??m m??n m???i" conten={AddNewFood} />
                    </Route>
                    <Route exact path='/menu/:key'>
                        <MainConten nameMain="Chi ti???t" conten={AddNewFood} />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default admin;