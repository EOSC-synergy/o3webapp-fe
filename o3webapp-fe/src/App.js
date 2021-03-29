import './App.css';
import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
} from 'react-router-dom';
import GenerationPageWithRouter from './pages/Generation/Generation.js';
import ManipulationPage from './pages/Manipulation/Manipulation.js';
import Home from './pages/Home/Home.js';
import Navigation from './components/navigation/Navigation.js';
import CookieConsent from 'react-cookie-consent';
import TermsOfUse from './pages/TermsOfUse/TermsOfUse';

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
          <Route path='/generation' >
            <Navigation key='/generation' loginRedirect={false}/>
            <GenerationPageWithRouter />
          </Route>
          <Route path='/manipulation'>
            <Navigation key='/manipulation' loginRedirect={false}/>
            <ManipulationPage />
          </Route>
          <Route path="/terms_of_use">
            <Navigation key='/terms_of_use' loginRedirect={false}/>
            <TermsOfUse />
          </Route>
          <Route path='/redirect_url'>
            <Navigation key='/' loginRedirect={true}/>
            <Home loginRedirect={true}/>
          </Route>
          <Route path='/'>
            <Navigation key='/' loginRedirect={false}/>
            <Home loginRedirect={false}/>
          </Route>
        </Switch>

        <CookieConsent
          style={{background: 'rgb(51, 51, 51, .8)'}}
          cookieName="Cookie-Consent"
          buttonStyle={{
            color: '#4e503b',
            fontSize: '13px',
            background: 'rgb(254, 209, 54)'
          }}
        >
              <span>This website uses cookies to enhance the user experience.&nbsp;
                <a id="cookies-learn-more" href="https://www.cookiesandyou.com/" target="_blank" rel="noopener noreferrer">Learn more.</a>
              </span>
        </CookieConsent>

        <CookieConsent
          style={{background: 'rgb(51, 51, 51, .8)'}}
          cookieName="ToS-Consent"
          buttonStyle={{
            color: '#4e503b',
            fontSize: '13px',
            background: 'rgb(254, 209, 54)'
          }}
        >
              <span>By continuing to use this website, you agree to our&nbsp;
                <a id="cookies-learn-more" href="/terms_of_use">Terms of Use.</a>
              </span>
        </CookieConsent>
      </Router>
    );
  }
}


export default App;
