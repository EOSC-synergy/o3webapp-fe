import {
    Link
} from 'react-router-dom';
import { MdAccountCircle } from 'react-icons/md'
import './Navigation.css'
import NavigationTab from './NavigationTab'

function Navigation() {
    return (
        <nav className="NavBar">
          <u1>
            <NavigationTab name="Home" pageLink="/"/>
            <NavigationTab name="Generation" pageLink="/generation"/>
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

export default Navigation;