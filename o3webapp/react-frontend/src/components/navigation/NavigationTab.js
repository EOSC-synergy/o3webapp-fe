import {
    Link
} from 'react-router-dom';
import React, { Component } from 'react';
import './NavigationTab.css'


class NavigationTab extends Component {

    render() {
        return (
            <li className={this.props.state}>
                <Link to={this.props.pageLink} className='NavBarLink' onClick={() => this.props.handleClick(this.props.name)}>{this.props.name} </Link>
            </li>
        )
    }
}

export default NavigationTab