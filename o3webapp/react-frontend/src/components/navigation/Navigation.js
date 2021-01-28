import {
    Link
} from 'react-router-dom';
import './Navigation.css'

function Navigation() {
    return (
        <nav className="NavBar">
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/generation'>Generation</Link>
            </li>
            <li>
              <Link to='/manipulation'>Manipulation</Link>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
          </ul>
        </nav>
    );
}

export default Navigation;