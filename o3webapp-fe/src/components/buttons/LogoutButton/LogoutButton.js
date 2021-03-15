import { MdAccountCircle } from 'react-icons/md'
import React from 'react';
import Cookies from 'universal-cookie';
import PropTypes from 'prop-types';

import './LogoutButton.css';


class LogoutButton extends React.Component {

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
        window.location.reload()
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

LogoutButton.propTypes = {
    loggedOut: PropTypes.func.isRequired
}

export default LogoutButton;