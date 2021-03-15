import {
    Link
} from 'react-router-dom';
import PropTypes from 'prop-types'
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

NavigationTab.propTypes = {
    state: PropTypes.string.isRequired,
    pageLink: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
}

export default NavigationTab