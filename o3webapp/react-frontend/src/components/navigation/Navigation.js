import './Navigation.css'
import NavigationTab from './NavigationTab'
import LoginButton from '../buttons/LoginButton/LoginButton'

import { Component } from 'react'

let Tabs = [
  {name: "Home", path: "/"},
  {name: "Generation", path: "/generation"},
  {name: "Manipulation", path: "/manipulation"}, 
  {name: "About", path: "/about"}
]


class Navigation extends Component {

  constructor(props) {
    super(props);

    //Get current Tab to activate the right tab button on initialization
    let currentPath = window.location.pathname
    let currentTab = Tabs.find(currentTab => currentTab.path === currentPath)

    //Catch any errors, if path is not matching any tabs
    try {
      this.state = {
        activeTab: currentTab.name
      }
    } catch (e) {
      this.state = {
        activeTab: "Home"
      }
    }
    
    this.handleTabClick = this.handleTabClick.bind(this);
  }

  
  /**
   * Callback function that updates the state with the active tab
   * @param {string} tabName Name of the clicked tab, that is now active
   */
  handleTabClick(tabName) {
    this.setState({activeTab: tabName})
  }

  /**
   * Helper function checks if the passed tab is active or not
   * @param {string} tabName Name of the tab to be checked
   * @returns {string} Returns the state of the tab ("active" or "inactive")
   */
  getActiveState(tabName) {
    if (this.state.activeTab == tabName) {return "active"}
    else {return "inactive"}
  }

  
  render() {
    return (
      <nav className="NavBar">
        <u1 className="NavBarContainer">
          <NavigationTab 
            name="Home" 
            pageLink="/"
            state={this.getActiveState("Home")}
            handleClick = {this.handleTabClick}
          />        
          <NavigationTab 
            name="Generation" 
            pageLink="/generation"
            state={this.getActiveState("Generation")}
            handleClick = {this.handleTabClick}
          />
          <NavigationTab 
            name="Manipulation" 
            pageLink="/manipulation"
            state={this.getActiveState("Manipulation")}
            handleClick = {this.handleTabClick}
          />
          <NavigationTab 
            name="About" 
            pageLink="/about"
            state={this.getActiveState("About")}
            handleClick = {this.handleTabClick}
          />
          <LoginButton/>
        </u1>

        {/* 
        <ul>
          <li className='active'>
            <Link to='/' className='NavBarLink'>Home</Link>
          </li>
          <li>
            <Link to='/generation' className='NavBarLink'>Generation</Link>
          </li>
          <li>
            <Link to='/manipulation' className='NavBarLink'>Manipulation</Link>
          </li>
          <li>
            <Link to='/about' className='NavBarLink'>About</Link>
          </li>
          <li>
            <Link to='/about' className='NavBarLink'>
              <div className='LoginButton'>
                <p>Login</p> 
                <i><MdAccountCircle size="30px"/></i>
              </div>
            </Link>
          </li>
        </ul>
        */}
      </nav>
    );
  }
}

export default Navigation;