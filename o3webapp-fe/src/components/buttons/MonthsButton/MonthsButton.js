import React from 'react';
import PropTypes from 'prop-types';

import Dropdown from '../DropdownMenu/Dropdown';
import * as configData from '../../../config.json';

import './MonthsButton.css';

class MonthsButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            season: configData.SEASON_DEFAULT_DROPDOWN,
        };
        this.resetThenSet = this.resetThenSet.bind(this);
        this.handleCustomMonths = this.handleCustomMonths.bind(this);
    }

    /**
     * callback function that updates the state here
     * @param {number} id 
     * @param {string} key 
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

    handleCustomMonths(event) {

        const inputString = event.target.value;

        //remove leading/trailing commas and whitespaces
        var str = inputString.replace(/(^[,\s]+)|([,\s]+$)/g, '');

        //convert to number array
        const inputNumber = str.split(',').map(function(item) {
            return parseInt(item, 10);
        });

        //TODO check if entered values are in allowed range (1 to 12)

        //check if array only includes numbers
        if (inputNumber.includes(NaN)) {
            //TODO implement some error notification
            //rn it just doesnt update the value
            console.log("Some NaN found")

        } else {
            //! Magic String
            const key = "season"
            const temp = [...this.state[key]]

            //! Magic Number
            temp[4].value = inputNumber;
            
            this.setState({
                [key]: temp
            })

            //! Magic number
            this.resetThenSet(4, key)
        }
    }

    render() {
        const customSelected = this.state.season[4].selected;

        return (
            <div className="month-button-wrapper section-wrapper">
                <p className="section-label">Season</p>
                <Dropdown 
                title="Select a season!"
                list={this.state.season}
                resetThenSet={this.resetThenSet} />
                {customSelected && (
                    <div className="custom-input-wrapper">
                        <fieldset>
                            <legend>Enter Months!</legend>
                            <input
                                defaultValue="1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12"
                                onChange={this.handleCustomMonths} />
                        </fieldset>
                    </div>
                )}
            </div>
        );
    }

}

MonthsButton.propTypes = {
    handleChange: PropTypes.func.isRequired
}

export default MonthsButton;