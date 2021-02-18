import './Navigation.css'
import NavigationTab from './NavigationTab'
import LoginButton from '../buttons/LoginButton/LoginButton'
import LogoutButton from '../buttons/LogoutButton/LogoutButton'
import { Component } from 'react'
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";



/** This controls all the Tabs in the Navigation bar
 * @name: Name to be displayed
 * @path: Path to be linked to
 */
let Tabs = [
  {name: "Home", path: "/"},
  {name: "Plot Generation", path: "/generation"},
  {name: "Manipulation", path: "/manipulation"}, 
  {name: "About", path: "/about"}
]

let loggedIn = false

class Navigation extends Component {

  constructor(props) {
    super(props);

    //Get current Tab to activate the right tab button on initialization
    let currentPath = window.location.pathname
    let currentTab = Tabs.find(currentTab => currentTab.path === currentPath)

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
    if (cookies.get('userID') === undefined) {
      loggedIn = false
    } else {
      loggedIn = true
    }

    console.log('User ID: ' + cookies.get('userID'))

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
    let id_token = currentURL.slice(currentURL.indexOf('#id_token=') + 10)

    //Decode JWT
    let token_decoded = jwt_decode(id_token)
    let subject_ID = token_decoded.sub

    //Sets the cookie
    const cookies = new Cookies();
    cookies.set('userID', subject_ID, { path: '/' });

    //Reads the cookie for last path before login
    let previousPath = cookies.get('o3webappPreviousPath')

    //Redirect to previous Path
    window.location.href= previousPath;

    //Updates the state of the component
    this.setState({
      loggedIn: true
    })
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
    loggedIn = false
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
    if (loggedIn) {
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
            <LogoutButton loggedOut = {this.loggedOut}/>
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

export default Navigation;