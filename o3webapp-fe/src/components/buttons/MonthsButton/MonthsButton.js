/*
TODO implement button

have 2 states, 
one for the chosen months, eg [1,2,3] for the first three months of the year
    this state gets managed by the form, cause its the single source of truth for this

second one for the currently choosen card/setting.
    available settings are: Spring, Summer, Autumn, Winter and Custom
    when the user selects custom an input field appears where he can enter custom numbers.
        this can be controller by checking with an if clause if the current state is custom and only then show this.

    when the user selects anything else the months corresponding to these settings get selected (eg [1,2,3] for Spring)



*/

import React from 'react';
import PropTypes from 'prop-types';

import Dropdown from '../DropdownMenu/Dropdown';

import './MonthsButton.css';

class MonthsButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            season: [
                {
                    id: 0,
                    title: "Spring",
                    value: [3, 4, 5],
                    selected: false,
                    key: "season",
                },
                {
                    id: 1,
                    title: "Summer",
                    value: [6, 7, 8],
                    selected: false,
                    key: "season",
                },
                {
                    id: 2,
                    title: "Autumn",
                    value: [9, 10, 11],
                    selected: false,
                    key: "season",
                },
                {
                    id: 3,
                    title: "Winter",
                    value: [1, 2, 12],
                    selected: false,
                    key: "season",
                },
                {
                    id: 4,
                    title: "Custom",
                    value: [],
                    selected: false,
                    key: "season",
                },
            ],
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
        const customMonths = "1, 2, 3"

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
                                defaultValue={customMonths}
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