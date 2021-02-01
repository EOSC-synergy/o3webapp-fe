import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './StartGeneratingButton.css'

class StartGeneratingButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li>
                <Link to='/generation' className="startButton">Start Generating!</Link>
            </li>
        )
    }
}

export default StartGeneratingButton