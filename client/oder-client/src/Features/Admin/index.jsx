import React from 'react';
import SideBar from './Components/Sidebar/SideBar';
import Main from './Components/Main/Main';
import Status from './Features/Status/index'
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';

import'./index.scss'

function Index(props) {
    const Match = useRouteMatch();
    return (
        <div className='admin' >
            <SideBar />
            <Switch>
                <Redirect exact from={`${Match.url}/`} to={`${Match.url}/status`}/>
                <Route path={`${Match.url}/status`} >
                    <Main Component={Status} />
                </Route>
            </Switch>
        </div>
    );
}

export default Index;