import './App.css';
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  //Link,
} from 'react-router-dom';
import Generation from './pages/Generation/Generation.js';
import Manipulation from './pages/Manipulation/Manipulation.js';
import About from './pages/About/About.js';
import Home from './pages/Home/Home.js';
import Navigation from './components/navigation/Navigation.js';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = { };
  } 
  
  render() {
    return (
      <Router>
          <Navigation />
          <Switch>
            <Route path='/generation'>
              <Generation />
            </Route>
            <Route path='/manipulation'>
              <Manipulation />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
            <Route path='/redirect_url'>
              {console.log("Hello there brotha")}
            </Route>
          </Switch>
      </Router>
    );
  }
}



export default App;
