import React from 'react';
import Oder from './Features/Oder/index';
import Admin from './Features/Admin/index';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'


function App(props) {
  return (
    <>
      <Router>

        <Switch>
          <Redirect exact from='/' to='/admin' />
          <Route path='/admin' component={Admin} />
          <Route path='/oder/:keytable' component={Oder} />
          <Route path='/oder/' component={()=><div>Khong co gi o day</div>} />
        </Switch>
      </Router>

    </>
  );
}

export default App;