import React from 'react';
import HeaderOder from './Features/Oder/Components/Header/Header';
import Oder from './Features/Oder/index';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'



function App(props) {
  return (
    <>
      <Router>
        <HeaderOder name="Nhà hàng hưng thịnh" />
        <Switch>
          <Redirect exact from='/' to='/oder' />
          <Route path='/oder' component={Oder} />
        </Switch>
      </Router>
    </>
  );
}

export default App;