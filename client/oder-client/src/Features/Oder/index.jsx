import React from 'react';
import { Switch, Route, useRouteMatch} from 'react-router-dom'
import './oder.scss'
import OderMain from './Features/OderMain/oder'
import ShopCart from './Features/ShopCart/ShopCart';
import HeaderOder from './Components/Header/Header';

function Index(props) {
    const Match = useRouteMatch();
    console.log(Match.url)
    return (
        <>
            <HeaderOder name="Nhà hàng hưng thịnh" />
            <div className='oder'>
                <Switch>
                    <Route exact path={Match.url} component={OderMain} />
                    <Route path={`${Match.url}/shopcart`} component={ShopCart} />
                </Switch>
            </div>
        </>
    );
}

export default Index;