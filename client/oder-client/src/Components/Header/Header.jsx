import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss'
import { Image } from '../../Constants/Image';

Header.propTypes = {
    name: PropTypes.string,
    category: PropTypes.array
};

Header.defaultProps = {
    name: 'Name: Unnamed',
    category: []
}

function Header(props) {
    const { name, } = props
    const [active, setActive] = useState(false);
    const activeMenu = () => {
        setActive(!active)
    }
    return (
        <header className="header">
            <div className="header__title">
                <img src={Image.logo} className="header__logo" alt="logo not found"></img>
                <h2 className="header__name">{name}</h2>
            </div>
            <ul className={active ? "header__menu active":"header__menu"}>
                <li className="header__tag"><a href="/">Hấp</a></li>
                <li className="header__tag"><a href="/">Lẩu</a></li>
                <li className="header__tag"><a href="/">Nướng</a></li>
            </ul>
            <div className="header__toggle" onClick={activeMenu}>
                <i className='bx bx-menu'></i>
            </div>
        </header>
    );
}

export default Header;