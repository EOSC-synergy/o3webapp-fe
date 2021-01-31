import './App.css';
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  //Link,
} from 'react-router-dom';
import Generation from './pages/Generation';
import Manipulation from './pages/Manipulation';
import About from './pages/About';
import Home from './pages/Home/Home.js';
import Navigation from './components/navigation/Navigation';

import Authenticate from 'react-openidconnect';
import OidcSettings from './login/oidcsettings';

class App extends Component {

  constructor(props) {
    super(props);
    this.userLoaded = this.userLoaded.bind(this); 
    this.userUnLoaded = this.userUnLoaded.bind(this);
 
    this.state = { user: undefined };
  }  

  userLoaded(user) {
    if (user)
      this.setState({ "user": user });
  } 
  
  userUnLoaded() {
    this.setState({ "user": undefined });
  } 
  
  NotAuthenticated() {
    return <div>You are not authenticated, please click here to authenticate.</div>;
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
          </Switch>
      </Router>
    );
  }
}



export default App;
