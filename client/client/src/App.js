import React, { Component } from 'react';
import {realtimeDB} from './config';
class App extends Component {
  constructor(){
    super();
    this.refDB = realtimeDB.ref('product');

    this.getData = this.getData.bind(this);
  }

  componentDidMount(){
    this.getData();
  }
  componentDidUpdate(){
  }
  getData(){
    this.refDB.on('value', (data)=>{
      console.log(1)
      this.setState({
        data:data.val()
      });
    })
  }

  render() {
    console.log(this.state)
    return (
      <div>
        
      </div>
    );
  }
  
}

export default App;