import './LoginButton.css';
import { MdAccountCircle } from 'react-icons/md'
import { Link } from 'react-router-dom';
import { Component } from 'react';

class LoginButton extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li>
                <Link className='NavBarLink'>
                    <div className='LoginButton' onClick={startLogin}>
                        <p>Login</p> 
                        <i><MdAccountCircle size="30px"/></i>
                    </div>
                </Link>
            </li>
        )
    }
}

function startLogin() {
    //TODO
    console.log("test")
}

export default LoginButton;