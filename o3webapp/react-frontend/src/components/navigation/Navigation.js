import './Navigation.css'
import NavigationTab from './NavigationTab'
import LoginButton from '../buttons/LoginButton/LoginButton'

import { Component } from 'react'


/* This controls all the Tabs in the Navigation bar
 * @name: Name to be displayed
 * @path: Path to be linked to
 */
let Tabs = [
  {name: "Home", path: "/"},
  {name: "Plot Generation", path: "/generation"},
  {name: "Manipulation", path: "/manipulation"}, 
  {name: "About", path: "/about"}
]


class Navigation extends Component {

  constructor(props) {
    super(props);

    //Get current Tab to activate the right tab button on initialization
    let currentPath = window.location.pathname
    let currentTab = Tabs.find(currentTab => currentTab.path === currentPath)

    //Catch any errors, if path is not matching any tabs, activate home tab
    try {
      this.state = {
        activeTab: currentTab.name
      }
    } catch (e) {
      this.state = {
        activeTab: Tabs[0].name
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