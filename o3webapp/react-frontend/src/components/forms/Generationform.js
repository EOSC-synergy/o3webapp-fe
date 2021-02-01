import React from 'react';
import MonthsButton from '../buttons/MonthsButton/MonthsButton';
import YearButton from '../buttons/YearButton/YearButton'

const plotTypes = {
    one: 'plot1',
    two: 'plot2',
    three: 'plot3',
};

class GenerationForm extends React.Component {
    /**
     * @constructor
     */
    constructor(props) {
        super(props);
        this.state = {
            //plotType: 'plot1',
            // models: [],
            years: [1970, 2100],
            months: [1, 2, 3],
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        //this.handleInputChange = this.handleInputChange.bind(this);


        this.handleLowerYearChange = this.handleLowerYearChange.bind(this);
        this.handleUpperYearChange = this.handleUpperYearChange.bind(this);
        this.handleMonthChange = this.handleMonthChange.bind(this);
    }


    handleMonthChange(new_months) {
        console.log(new_months)
        this.setState({
            months: new_months
        })
    }

    /**
     * Handles updating the state for the lower year
     * @param {number} year - entered year
     */
    handleLowerYearChange(year) {
        const oldState = this.state.years;


        /* validate input,
            TODO: implement
            year needs to be smaller than upper entry
            year needs to be a number
            year needs to be in predefined region (1970-2100) or something 
        */

        this.setState({
            years: [year, oldState[1]]
        })
    }

    /**
     * Handles updating the state for the upper year
     * @param {number} year - entered year
     */
    handleUpperYearChange(year) {
        const oldState = this.state.years;

        /* validate input,
            TODO: Implement
            year needs to be bigger than lower entry
            year needs to be a number
            year needs to be in predefined region (1970-2100) or something 
        */

        this.setState({
            years: [oldState[0], year]
        })
    }
    

    //TODO we can check here if the user is logged in and submit to a different endpoint if that is the case
    /**
     * handles the submit of the request
     *  calls the API with the submitted values and redirects
     * @param event 
     */
    handleSubmit(event) {
        alert('this was submitted: ' 
                + "\nyears: " + this.state.years[0] + " to " + this.state.years[1]
                + "\nmonths: " + this.state.months);
        event.preventDefault();
    }

    /**
     * renders the form
     */
    render() {
        const years = this.state.years;
        const months = this.state.months;

        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    {/* <PlotButton /> */}
                </div>



                <div>
                    <YearButton 
                    year={years[0]}
                    bound="lower"
                    handleYearChange={this.handleLowerYearChange} />
                    <YearButton
                    year={years[1]}
                    bound="upper"
                    handleYearChange={this.handleUpperYearChange} />
                </div>
                <br />

                <div>
                    <MonthsButton
                    months={months}
                    handleChange={this.handleMonthChange} />
                </div>
                <br />
                <input type='submit' value="Submit" />
            </form>
        );
    }
}

export default GenerationForm;