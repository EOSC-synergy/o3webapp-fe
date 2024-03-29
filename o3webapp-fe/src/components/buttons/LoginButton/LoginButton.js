import './LoginButton.css';
import { MdAccountCircle } from 'react-icons/md'
import React from 'react';
import Cookies from 'universal-cookie';
import configData from '../../../config.json'

let nonce = null

class LoginButton extends React.Component {
    
    render() {
        return (
            <li>
                <div className='NavBarLink'>
                    <a className='LoginButton' id='loginButton' onClick={startLogin}>
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
    '&redirect_uri=' + window.location.origin + configData.OIDC_SETTINGS.REDIRECT_URI +
    '&scope=' + configData.OIDC_SETTINGS.SCOPE +
    '&response_type=' + configData.OIDC_SETTINGS.RESPONSE_TYPE +
    '&response_mode=' + configData.OIDC_SETTINGS.RESPONSE_MODE +
    '&nonce=' + nonce
}


export default LoginButton;