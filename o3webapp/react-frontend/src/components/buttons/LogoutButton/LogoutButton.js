import './LogoutButton.css';
import { MdAccountCircle } from 'react-icons/md'
import { Component } from 'react';
import Cookies from 'universal-cookie';


const egi_endpoint = 'https://aai-dev.egi.eu/oidc/authorize'
const client_id = 'o3webapp'
const redirect_uri = 'https://localhost/redirect_url'
const scope = 'openid'
const response_type = 'id_token'
const response_mode = 'query'
const client_secret = ''
let nonce = null
let requestURL = null

class LogoutButton extends Component {

    constructor(props) {
        super(props);

        this.handleLogOut = this.handleLogOut.bind(this);
    }

    /**
     * Redirects to the Account page
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