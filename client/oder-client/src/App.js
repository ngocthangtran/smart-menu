import React, { useEffect } from 'react';
import Oder from './Features/Oder/index';
import Admin from './Features/Admin/index';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { getAllProduct } from './APP/listFoodSlice';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';


function App(props) {
  const dispatch = useDispatch()
  const data = useSelector(state => state.allfood)
  useEffect(async () => {
    try {
      const action = getAllProduct()
      const actionResult = await dispatch(action)
      const currenListFood = unwrapResult(actionResult);
      console.log(currenListFood)
    } catch (error) {
      console.log('Error get all product', error);
    }
  }, [])
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