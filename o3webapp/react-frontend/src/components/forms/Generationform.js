import React from 'react';
import LatitudeButton from '../buttons/LatitudeButton/LatitudeButton';
import MonthsButton from '../buttons/MonthsButton/MonthsButton';
import PlotButtonController from '../buttons/PlotButton/PlotButtonController';
import YearButton from '../buttons/YearButton/YearButton'
import ModelController from '../ModelController/ModelController';

import './Generationform.css'


class GenerationForm extends React.Component {
    /**
     * @constructor
     */
    constructor(props) {
        super(props);
        this.state = {
            plotType: "tco3_zm",
            models: [],
            years: [1970, 2100],
            months: [1, 2, 3],
            latitude: [-90, 0],
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        //this.handleInputChange = this.handleInputChange.bind(this);


        this.handleLowerYearChange = this.handleLowerYearChange.bind(this);
        this.handleUpperYearChange = this.handleUpperYearChange.bind(this);
        this.handleMonthChange = this.handleMonthChange.bind(this);
        this.handleLatitudeChange = this.handleLatitudeChange.bind(this);
        this.handlePlotTypeChange = this.handlePlotTypeChange.bind(this);
        this.handleModelChange = this.handleModelChange.bind(this);
    }


    handlePlotTypeChange(plotType) {
        console.log(plotType);
        this.setState({
            plotType: plotType
        })
    }

    handleLatitudeChange(new_latitude) {
        console.log(new_latitude);
        this.setState({
            latitude: new_latitude
        })
    }

    handleMonthChange(new_months) {
        console.log(new_months);
        this.setState({
            months: new_months
        });
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

    handleModelChange(model) {
        var oldmodels = this.state.models;

        if (oldmodels.includes(model)) {
            //removes the model from the list
            const index = oldmodels.indexOf(model);
            oldmodels.splice(index, 1);
        } else {
            //add model to list
            oldmodels.push(model);
        }

        this.setState({
            models: oldmodels
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
                + "\nPlottype: " + this.state.plotType
                + "\nyears: " + this.state.years[0] + " to " + this.state.years[1]
                + "\nmonths: " + this.state.months
                + "\nlatitude:" + this.state.latitude
                + "\nmodels:" + this.state.models
                );
        event.preventDefault();

        //convert state to json
        const currState = this.state;
        const jsonState = JSON.stringify(currState);
        console.log(jsonState)
    }

    /**
     * renders the form
     */
    render() {
        const years = this.state.years;
        const months = this.state.months;
        const latitude = this.state.latitude;
        const models = this.state.models

        return (
            <div className="generation-form-wrapper">
                <form onSubmit={this.handleSubmit} className="generation-form">
                        <PlotButtonController
                            handleChange={this.handlePlotTypeChange} />
    
                        <ModelController
                            handleChange={this.handleModelChange}
                            selectedModels={models} />
    

                        <div className="year-section-wrapper">
                            <p className="section-label">Years to plot</p>
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
    
                        <MonthsButton
                            months={months}
                            handleChange={this.handleMonthChange} />
                   
                        <LatitudeButton
                            latitude={latitude}
                            handleChange={this.handleLatitudeChange} />
                   
                    <br />
                    <input type='submit' value="Submit" className="submit-button"/>
                </form>
            </div>
        );
    }
}


export default GenerationForm;