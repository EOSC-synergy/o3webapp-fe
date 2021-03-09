import './LoginButton.css';
import { MdAccountCircle } from 'react-icons/md'
import { Component } from 'react';
import Cookies from 'universal-cookie';

/*
https://aai-dev.egi.eu/oidc/authorize
?client_id=o3webapp
&redirect_uri=https://localhost/redirect_url
&scope=openid
&response_type=token
&response_mode=query
&nonce=ozmw60kqwi
*/

const egi_endpoint = 'https://aai-dev.egi.eu/oidc/authorize'
const client_id = 'o3webapp'
const redirect_uri = 'http://localhost:3000/redirect_url'
const scope = 'openid%20profile%20email'
const response_type = 'code'
const response_mode = 'query'
//const client_secret = ''
let nonce = null
let requestURL = null

class LoginButton extends Component {
    
    render() {
        return (
            <li>
                <div className='NavBarLink'>
                    <a className='LoginButton' onClick={startLogin}>
                        <p>Login</p> 
                        <i><MdAccountCircle size="30px"/></i>
                    </a>
                </div>
            </li>
        )
    }
}

/**
 * Starts the login flow
 */
function startLogin() {
    const cookies = new Cookies();
    let currentPath = window.location.pathname
    cookies.set('o3webappPreviousPath', currentPath, { path: '/' });
    buildRequestURL()
    window.location.href = requestURL
}

function makeNonce(length) {
    var result           = '';
    var characters       = 'abcdefghijklmnopqrstuvwxyz123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

function buildRequestURL() {

    nonce = makeNonce(9)

    requestURL = egi_endpoint + 
    '?client_id=' + client_id +
    '&redirect_uri=' + redirect_uri +
    '&scope=' + scope +
    '&response_type=' + response_type +
    '&response_mode=' + response_mode +
    '&nonce=' + nonce
}


export default LoginButton;