import React, { Component } from 'react';
// import {BrowserRouter as Router, Link, Route } from 'react-router-dom'

import Admin from './admin/admin';
import Oder from './order/oder'

class App extends Component {
  render() {
    return (
      <>
        <Admin/>
        {/* <Oder/> */}
      </>
    );
  }
}

export default App;