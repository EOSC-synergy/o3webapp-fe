import React from 'react';
import PropTypes from 'prop-types';

import Dropdown from '../DropdownMenu/Dropdown';
import * as configData from '../../../config.json';

import './LatitudeButton.css'

/**
 * Represents the latitude selection
 */
class LatitudeButton extends React.Component {
    /**
     * @constructor
     * @override
     */
    constructor(props) {
        super(props);
        this.state = {
            latitude: configData.LATITUDE_DEFAULT_DROPDOWN,
        };
        this.resetThenSet = this.resetThenSet.bind(this);
        this.handleCustomMonths = this.handleCustomMonths.bind(this);
    }

    /**
     * updates the state
     * @param {number} id - id of the selected field 
     * @param {string} key - key of the list
     */
    resetThenSet(id, key) {
        const temp = [...this.state[key]];
        
        temp.forEach((item) => item.selected = false);
        temp[id].selected = true;

        this.setState({
            [key]: temp,
        })

        const value = this.state[key][id].value;

        //update form
        this.props.handleChange(value);
    }

    /**
     * handles input in the custom field
     * @param event 
     */
    handleCustomMonths(event) {

        const inputString = event.target.value;

        //remove leading/trailing commas and whitespaces
        var str = inputString.replace(/(^[,\s]+)|([,\s]+$)/g, '');

        //convert to number array
        const inputNumber = str.split(',').map(function(item) {
            return parseInt(item, 10);
        });

        //check if array only includes numbers
        if (inputNumber.includes(NaN)) {
            //TODO implement some error notification
            //rn it just doesnt update the value
            console.log("Some NaN found")

        } else {
            const key = "latitude"
            const temp = [...this.state[key]]

            temp[7].value = inputNumber;
            
            this.setState({
                [key]: temp
            })
            
            this.resetThenSet(7, key)
        }
    }

    render() {
        const customSelected = this.state.latitude[7].selected;

        return (
            <div className="latitude-button-wrapper section-wrapper">
                <p className="section-label">Latitude Band</p>
                <Dropdown 
                title="Select a Latitude Band!"
                list={this.state.latitude}
                resetThenSet={this.resetThenSet} />
                {customSelected && (
                    <div className="custom-input-wrapper">
                        <fieldset>
                            <legend>Enter Latitude!</legend>
                            <input
                                defaultValue="-90, 0"
                                onChange={this.handleCustomMonths} />
                        </fieldset>
                    </div>
                )}
            </div>
        );
    }

}

LatitudeButton.propTypes = {
    handleChange: PropTypes.func.isRequired
}


export default LatitudeButton;