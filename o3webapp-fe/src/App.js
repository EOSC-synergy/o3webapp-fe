import './App.css';
import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
} from 'react-router-dom';
import Generation from './pages/Generation/Generation.js';
import Manipulation from './pages/Manipulation/Manipulation.js';
import About from './pages/About/About.js';
import Home from './pages/Home/Home.js';
import Navigation from './components/navigation/Navigation.js';
import CookieConsent from 'react-cookie-consent';

/**
 * The main App class
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }


  render() {
    return (
      <Router>
        <Switch>
          <Route path='/generation'>
            <Navigation key='/generation'/>
            <Generation />
          </Route>
          <Route path='/manipulation'>
            <Navigation key='/manipulation'/>
            <Manipulation />
          </Route>
          <Route path="/about">
            <Navigation key='/about'/>
            <About />
          </Route>
          <Route path='/redirect_url'>
            <Navigation key='/' loginRedirect={true}/>
            <Home loginRedirect={true}/>
          </Route>
          <Route path='/'>
            <Navigation key='/'/>
            <Home loginRedirect={false}/>
          </Route>
        </Switch>
        <CookieConsent
          style={{background: 'rgb(51, 51, 51, .8)'}}
          buttonStyle={{
            color: '#4e503b',
            fontSize: '13px',
            background: 'rgb(254, 209, 54)'
          }}
        >
              This website uses cookies to enhance the user experience.
        </CookieConsent>
      </Router>
    );
  }
}


export default App;
