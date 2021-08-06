import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import Main from './Components/Main/Main';
import SideBar from './Components/Sidebar/SideBar';
import Menu from './Features/Menu';
import AddDrinks from './Features/Menu/AddDrinks';
import AddFood from './Features/Menu/AddProduct/index';
import Status from './Features/Status/index';
import ViewATable from './Features/Table/ViewATable/ViewATable';
import CreateTable from './Features/Table/CreateTable/CreateTable';
import './index.scss';

function Index(props) {
    const Match = useRouteMatch();
    return (
        <div className='admin' >
            <SideBar />
            <Switch>
                <Redirect exact from={`${Match.url}/`} to={`${Match.url}/status`} />
                <Route path={`${Match.url}/status`} >
                    <Main Component={Status} />
                </Route>
                <Route path={`${Match.url}/tablekey`} >
                    <Main Component={ViewATable} />
                </Route>
                <Route path={`${Match.url}/menu`} >
                    <Main Component={Menu} />
                </Route>
                <Route path={`${Match.url}/addfood/`} >
                    <Main Component={AddFood} />
                </Route>
                <Route path={`${Match.url}/addrinks`} >
                    <Main Component={AddDrinks} />
                </Route>
                <Route path={`${Match.url}/addtable`}>
                    <Main Component={CreateTable} />
                </Route>

            </Switch>
        </div>
    );
}

export default Index;