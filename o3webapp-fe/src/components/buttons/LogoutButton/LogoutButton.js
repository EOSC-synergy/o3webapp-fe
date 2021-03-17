import './LogoutButton.css';
import { MdAccountCircle } from 'react-icons/md'
import { Component } from 'react';
import Cookies from 'universal-cookie';


class LogoutButton extends Component {

    constructor(props) {
        super(props);

        //Read user name from Cookies
        const cookies = new Cookies();
        this.state = {
            userName : cookies.get('userName')
        }

        this.handleLogOut = this.handleLogOut.bind(this);
    }

    /**
     * Handles the logout
     */
    handleLogOut() {
        //Remove the cookie
        const cookies = new Cookies();
        cookies.remove('egiID')
        cookies.remove('userName')

        this.props.loggedOut()
    }

    render() {
        return (
            <li>
                <div className='NavBarLink' data-md-tooltip="Log Out">
                    <a className='LoginButton' onClick={() => this.handleLogOut()}>
                        <p>{this.state.userName}</p> 
                        <i><MdAccountCircle size="30px"/></i>
                    </a>
                </div>
            </li>
        )
    }
}



export default LogoutButton;