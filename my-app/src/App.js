import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GeoMap from './components/GeoMap';

class App extends Component {
  componentDidMount(){
  
    this.testFetch();
    
  }
testFetch(){
  fetch('/hello/index',{
      method:"GET"
    //  mode:"cors"     
     })
    .then(response => {
    
       return response.json();
      }
    ).then((result) => {console.log(result)})
    .catch(error => console.log('error is', error));
}


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <GeoMap></GeoMap>
      </div>
    );
  }
}


export default App;
