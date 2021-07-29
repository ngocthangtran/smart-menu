import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SideBarMenu from './SideBarMenu';
import { Link, useRouteMatch } from 'react-router-dom';
import { useEffect } from 'react';

SideBarMenuDropdown.propTypes = {
    Icon: PropTypes.func,
    nameParentMenu: PropTypes.string,
    nameChild: PropTypes.array,
    classNameParent: PropTypes.bool,
    onClick: PropTypes.func
};
SideBarMenuDropdown.defaultProps = {
    Icon: null,
    nameParentMenu: 'No name',
    nameChild: [],
    classNameParent: false,
    onClick: null
}

function SideBarMenuDropdown(props) {
    const { Icon, nameParentMenu, nameChild, classNameParent, onClick } = props

    const Match = useRouteMatch();
    const [activeName, setActiveName] = useState('');
    const onClickItemChil = (name) => {
        setActiveName(name)
    }

    useEffect(() => {
        const menuDropdown = document.querySelector('.sidebar-menu-dropdown')
        const menuDropdownActive = document.querySelector('.sidebar-menu-dropdown.active')

        if (menuDropdownActive) {
            const countElement = menuDropdown.children.length;
            menuDropdown.style.height = `${countElement * menuDropdown.children[0].offsetHeight}px`
        }
        else{
            menuDropdown.style.height = `0px`
        }
    })

    return (
        <li>
            <Link to={Match.url} className={classNameParent ? 'active' : ''}
                onClick={() => {
                    onClick(nameParentMenu)
                }}
            >
                {Icon && <Icon />}
                <span>{nameParentMenu}</span>
                <div className={classNameParent ? 'dropdown-icon active' : 'dropdown-icon'}>
                    <i className='bx bx-chevron-down'></i>
                </div>
            </Link>

            <ul className={classNameParent ? 'sidebar-menu-dropdown active' : 'sidebar-menu-dropdown'}>
                {
                    nameChild.map((item, index) => {
                        return (
                            <div key={index}>
                                <SideBarMenu name={item.name}
                                    onClick={onClickItemChil}
                                    className={item.name === activeName}
                                    href={item.href}
                                />
                            </div>
                        )
                    })
                }
            </ul>
        </li>
    );
}

export default SideBarMenuDropdown;