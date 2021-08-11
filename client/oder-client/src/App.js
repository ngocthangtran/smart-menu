import React from 'react';
import Oder from './Features/Oder/index';
import Admin from './Features/Admin/index';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import NotFound from './Components/NotFound/NotFound';
import NotAuthen from './Components/403/NotAuthen';


function App(props) {
  return (
    <>
      <Router>

        <Switch>
          <Redirect exact from='/' to='/admin' />
          <Route path='/admin' component={Admin} />
          <Route path='/oder/:keytable' component={Oder} />
          <Route path='/authenticator/' component={NotAuthen} />
          <Route path='/notfound/' component={NotFound} />
        </Switch>
      </Router>

    </>
  );
}

export default App;