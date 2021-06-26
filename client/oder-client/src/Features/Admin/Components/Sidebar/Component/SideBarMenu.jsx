import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

SideBarMenu.propTypes = {
    href: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.bool,
    onClick:PropTypes.func,

    Icon: PropTypes.func,
};

SideBarMenu.defaultProps = {
    href: '',
    Icon: null,
    onClick:null,
    name: 'No name',
}

function SideBarMenu(props) {
    const { href, Icon, name, className,onClick } = props;
    return (
        <li>
            <Link
                to={href}
                className={className ? 'active' : ''}
                onClick={()=>{
                    onClick(name)
                }}
            >
                {
                    Icon && <Icon />
                }
                <span>{name}</span>
            </Link>
        </li>
    );
}

export default SideBarMenu;