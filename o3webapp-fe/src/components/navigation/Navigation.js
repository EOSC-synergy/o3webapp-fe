import './Navigation.css'
import NavigationTab from './NavigationTab'
import LoginButton from '../buttons/LoginButton/LoginButton'
import LogoutButton from '../buttons/LogoutButton/LogoutButton'
import React from 'react'
import PropTypes from 'prop-types';
import { Component } from 'react'
import Cookies from 'universal-cookie';
import configData from '../../config.json'
import Axios from 'axios';




/** This controls all the Tabs in the Navigation bar
 * @name: Name to be displayed
 * @path: Path to be linked to
 */
let Tabs = [
  {name: "Home", path: "/"},
  {name: "Plot Generation", path: "/generation"},
  {name: "About", path: "/about"}
]

class Navigation extends Component {

  constructor(props) {
    super(props);

    //Get current Tab to activate the right tab button on initialization
    let currentPath = window.location.pathname
    let currentTab = Tabs.find(currentTab => currentTab.path === currentPath)

    if (currentPath === '/manipulation') {
      currentTab = Tabs.find(currentTab => currentTab.path === '/generation')
    }

    //Catch any errors, if path is not matching any tabs, activate home tab
    try {
      this.state = {
        activeTab: currentTab.name,
        loggedIn: false
      }
    } catch (e) {
      this.state = {
        activeTab: Tabs[0].name,
        loggedIn: false
      }
    }

    //Call the loginCallback() if the user just logged in
    if (this.props.loginRedirect) {
      this.loginCallback()
    }

    //Checks if the user is logged in, by checking the cookies
    const cookies = new Cookies();
    let tempActiveTab = this.state.activeTab

    //Sets the state accordingly to the log in status
    if (cookies.get('egiID') === undefined) {
      this.state = {
        activeTab: tempActiveTab,
        loggedIn: false,
        userName: undefined
      }
    } else {
      this.state = {
        activeTab: tempActiveTab,
        loggedIn: true,
        userName: cookies.get('userName')
      }
    }

    this.handleTabClick = this.handleTabClick.bind(this);
    this.loggedOut = this.loggedOut.bind(this);
    this.loginCallback = this.loginCallback.bind(this)
  }

  /**
   * Function that handles the login callback. It parses the ID token and sets the cookie
   */
  loginCallback() {

    //Token parsing out of the URL
    let currentURL = window.location.href
    let authCode = currentURL.slice(currentURL.indexOf('code=') + 5)
    
    //Prepares the Cookies
    const cookies = new Cookies();

    let request = this.callBackendForLogin(authCode)
    request.then(response => {
      
      //Sets the cookies
      cookies.set('userName', response.data.name, { path: '/', maxAge: configData.LOGIN_COOKIE_MAX_AGE})
      cookies.set('egiID', response.data.sub, { path: '/', maxAge: configData.LOGIN_COOKIE_MAX_AGE})
      console.log(response.data)

      console.log('User Name: ' + cookies.get('userName'))
      console.log('EGI ID: ' + cookies.get('egiID'))

      //Reads the cookie for last path before login
      let previousPath = cookies.get('o3webappPreviousPath')

      //Redirect to previous Path
      window.location.href= previousPath;
    })
    request.catch(error => {
      console.error(error)
      alert("Login Failed due to an internal backend error.\nPlease try again")

      //Reads the cookie for last path before login
      let previousPath = cookies.get('o3webappPreviousPath')

      //Redirect to previous Path
      window.location.href= previousPath;
    });
  }

  /**
   * Calls the backed to continue the Login Flow
   * @param authCode Authentication Code
   * @returns Returns the Axios Promise object
   */
  callBackendForLogin(authCode) {

    let server_url = process.env.REACT_APP_SERVER_URL;
    if (server_url === undefined) {
        console.log("No URL specified for backend, taking default url");
        server_url = configData.SERVER_URL;
        console.log(server_url);
    }

    const login_url = server_url + configData.LOGIN_PATH + '/' + authCode;

    const requestOptions = {
      headers: { 
          'Content-Type': 'application/json',
      },
      timeout: 5000
    };

    return Axios.get(login_url, requestOptions);
  }
  
  /**
   * Callback function that updates the state with the active tab
   * @param {string} tabName Name of the clicked tab, that is now active
   */
  handleTabClick(tabName) {
    this.setState({
      activeTab: tabName
    })
  }

  /**
   * Callback function that updates the state when user logs out
   */
  loggedOut() {
    this.setState({
      loggedIn: false
    })
  }

  /**
   * Helper function checks if the passed tab is active or not
   * @param {string} tabName Name of the tab to be checked
   * @returns {string} Returns the state of the tab ("active" or "inactive")
   */
  getActiveState(tabName) {
    if (this.state.activeTab === tabName) {return "active"}
    else {return "inactive"}
  }
  
  render() {
    if (this.state.loggedIn) {
      return (
        <nav className="NavBar">
          <ul className="NavBarContainer">

            {Tabs.map((element, index) => {
              return (
                <NavigationTab 
                key={index}
                name={element.name}
                pageLink={element.path}
                state={this.getActiveState(element.name)}
                handleClick = {this.handleTabClick}
                />
              )
            })}
            <LogoutButton loggedOut = {this.loggedOut} name = {this.state.userName}/>
          </ul>
        </nav>
      );
    } else {
      return (
        <nav className="NavBar">
          <ul className="NavBarContainer">

            {Tabs.map((element, index) => {
              return (
                <NavigationTab 
                key={index}
                name={element.name}
                pageLink={element.path}
                state={this.getActiveState(element.name)}
                handleClick = {this.handleTabClick}
                />
              )
            })}
            <LoginButton/>
          </ul>
        </nav>
      );
    }
  }
}

Navigation.propTypes = {
  loginRedirect: PropTypes.bool.isRequired
}

export default Navigation;