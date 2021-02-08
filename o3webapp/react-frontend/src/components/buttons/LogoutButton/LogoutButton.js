import './LogoutButton.css';
import { MdAccountCircle } from 'react-icons/md'
import { Component } from 'react';
import Cookies from 'universal-cookie';


class LogoutButton extends Component {

    constructor(props) {
        super(props);

        this.handleLogOut = this.handleLogOut.bind(this);
    }

    /**
     * Handles the logout
     */
    handleLogOut() {
        //Remove the cookie
        const cookies = new Cookies();
        cookies.remove('userID')

        this.props.loggedOut()
    }

    render() {
        return (
            <li>
                <div className='NavBarLink'>
                    <a className='LoginButton' onClick={() => this.handleLogOut()}>
                        <p>Logout</p> 
                        <i><MdAccountCircle size="30px"/></i>
                    </a>
                </div>
            </li>
        )
    }
}



export default LogoutButton;