import './LoginButton.css';
import { MdAccountCircle } from 'react-icons/md'
import { Component } from 'react';
import Cookies from 'universal-cookie';
import configData from '../../../config.json'

const egi_endpoint = 'https://aai-dev.egi.eu/oidc/authorize'
const client_id = 'o3webapp'
const redirect_uri = 'http://localhost:3000/redirect_url'
const scope = 'openid%20profile%20email'
const response_type = 'code'
const response_mode = 'query'
let nonce = null

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
    let requestURL = buildRequestURL()
    window.location.href = requestURL
}

/**
 * Generates a nonce
 * @param length Length of the nonce
 * @returns The Nonce
 */
function makeNonce(length) {
    var result           = '';
    var characters       = 'abcdefghijklmnopqrstuvwxyz123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 
/**
 * Builds and returns the Login URL
 * @returns The Login URL
 */
function buildRequestURL() {

    nonce = makeNonce(9)

    return configData.OIDC_SETTINGS.EGI_ENDPOINT + 
    '?client_id=' + configData.OIDC_SETTINGS.CLIENT_ID +
    '&redirect_uri=' + configData.OIDC_SETTINGS.REDIRECT_URI +
    '&scope=' + configData.OIDC_SETTINGS.SCOPE +
    '&response_type=' + configData.OIDC_SETTINGS.RESPONSE_TYPE +
    '&response_mode=' + configData.OIDC_SETTINGS.RESPONSE_MODE +
    '&nonce=' + nonce
}


export default LoginButton;