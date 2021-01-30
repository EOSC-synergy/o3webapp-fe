import {
    Link
} from 'react-router-dom';
import './NavigationTab.css'

function NavigationTab(props) {
    return (
        <li>
              <Link to={props.pageLink} className='NavBarLink'>{props.name}</Link>
        </li>
    )
}

export default NavigationTab