import React from 'react';
import { useState } from 'react';
import { Image } from '../../../../Constants/Image';
import SideBarMenu from "./Component/SideBarMenu";
import SideBarMenuDropdown from './Component/SideBarMenuDropdown';
import './sidebar.scss';
import { useRouteMatch } from 'react-router-dom'

function SideBar(props) {

    const [activeName, setActiveName] = useState('Trạng thái');
    const onClick = (name) => {
        setActiveName(name)
    }
    const Match = useRouteMatch();
    return (
        <div className='side-bar'>
            <div className='side-bar-logo'>
                <img src={Image.logo} alt="err:don't get logo" />
            </div>
            <div className='side-bar-info'>
                <div className='info-logo'>
                    <img src={Image.info} alt="not" />
                </div>
                <div className='info-name'>
                    Trần Ngọc Thăng
                </div>
                <i className='bx bx-log-out'></i>
            </div>
            <ul className='sidebar-menu'>
                <SideBarMenu
                    Icon={() => <i className='bx bx-home' ></i>}
                    name='Trạng thái'
                    onClick={onClick}
                    className={activeName === 'Trạng thái'}
                    href={`${Match.url}/status`}
                />
                <SideBarMenuDropdown
                    nameParentMenu='Thực đơn'
                    Icon={() => <i className='bx bx-food-menu'></i>}
                    onClick={onClick}
                    classNameParent={activeName === 'Thực đơn'}
                    nameChild={[
                        { name: 'Danh sách', href: `${Match.url}/menu` },
                        { name: 'Thêm món', href: `${Match.url}/addfood` },
                        { name: 'Thêm đồ uống', href: `${Match.url}/addrinks` },
                    ]}
                />
                <SideBarMenuDropdown
                    nameParentMenu='Quản lý bàn'
                    Icon={() => <i className='bx bx-scan' ></i>}
                    onClick={onClick}
                    classNameParent={activeName === 'Quản lý bàn'}
                    nameChild={[
                        { name: 'Tạo bàn', href: `${Match.url}/addtable` },
                        { name: 'Thêm món', href: `${Match.url}/addfood` },
                        { name: 'Thêm đồ uống', href: `${Match.url}/addrinks` },
                    ]}
                />
            </ul>
        </div>
    );
}

export default SideBar;