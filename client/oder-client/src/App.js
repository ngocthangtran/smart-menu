import React, { useEffect } from 'react';
import Oder from './Features/Oder/index';
import Admin from './Features/Admin/index';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { getAllProduct } from './APP/listFoodSlice';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';


function App(props) {
  return (
    <>
      <Router>

        <Switch>
          <Redirect exact from='/' to='/admin' />
          <Route path='/admin' component={Admin} />
          <Route path='/oder' component={Oder} />
        </Switch>
      </Router>

    </>
  );
}

export default App;