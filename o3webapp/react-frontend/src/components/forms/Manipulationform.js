import React from 'react'
import { withRouter, Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

import LatitudeButton from '../buttons/LatitudeButton/LatitudeButton';
import MonthsButton from '../buttons/MonthsButton/MonthsButton';
import PlotButtonController from '../buttons/PlotButton/PlotButtonController';
import YearButton from '../buttons/YearButton/YearButton'
import ModelController from '../ModelController/ModelController';

import './Generationform.css'

import configData from '../../config.json'





class ManipulationForm extends React.Component {
     /**
     * @constructor
     */
    constructor(props) {
        super(props);
        this.state = {
            pType: configData.GENERATION_DEFAULTS.PLOT_TYPE,
            models: configData.GENERATION_DEFAULTS.MODELS,
            begin: configData.GENERATION_DEFAULTS.BEGIN,
            end: configData.GENERATION_DEFAULTS.END,
            month: configData.GENERATION_DEFAULTS.MONTH,
            lat_min: configData.GENERATION_DEFAULTS.LAT_MIN,
            lat_max: configData.GENERATION_DEFAULTS.LAT_MAX,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        //this.handleInputChange = this.handleInputChange.bind(this);


        this.handleLowerYearChange = this.handleLowerYearChange.bind(this);
        this.handleUpperYearChange = this.handleUpperYearChange.bind(this);
        this.handleMonthChange = this.handleMonthChange.bind(this);
        this.handleLatitudeChange = this.handleLatitudeChange.bind(this);
        this.handlePlotTypeChange = this.handlePlotTypeChange.bind(this);
        this.handleModelChange = this.handleModelChange.bind(this);
        this.saveStateAsCookie = this.saveStateAsCookie.bind(this);
    }


    handlePlotTypeChange(plotType) {
        console.log(plotType);
        this.setState({
            pType: plotType
        })
        this.saveStateAsCookie();
    }

    handleLatitudeChange(latitude_array) {
        console.log("Updated Lattitude:", latitude_array);
        var lat_min = (latitude_array[0] !== undefined) ? latitude_array[0] : configData.GENERATION_DEFAULTS.LAT_MIN;
        var lat_max = (latitude_array[1] !== undefined) ? latitude_array[1] : configData.GENERATION_DEFAULTS.LAT_MAX;
        console.log(lat_min, lat_max)
        this.setState({
            lat_min: lat_min,
            lat_max: lat_max,
        })
        this.saveStateAsCookie();
    }

    handleMonthChange(new_months) {
        console.log(new_months);
        this.setState({
            months: new_months
        });
        this.saveStateAsCookie();
    }

    /**
     * Handles updating the state for the lower year
     * @param {number} year - entered year
     */
    handleLowerYearChange(year) {
        //const oldBegin = this.state.begin;
        //const oldEnd = this.state.end;


        /* validate input,
            TODO: implement
            year needs to be smaller than upper entry
            year needs to be a number
            year needs to be in predefined region (1970-2100) or something 
        */

        this.setState({
            begin: year
        })
        this.saveStateAsCookie();
    }

    /**
     * Handles updating the state for the upper year
     * @param {number} year - entered year
     */
    handleUpperYearChange(year) {
        //const oldBegin = this.state.begin;
        //const oldEnd = this.state.end;

        /* validate input,
            TODO: Implement
            year needs to be bigger than lower entry
            year needs to be a number
            year needs to be in predefined region (1970-2100) or something 
        */

        this.setState({
            end: year
        })
        this.saveStateAsCookie();
    }

    /**
     * updates the state with the selcted models. Inserts the object needed for the backend instead of the string
     * @param model the selected model as string
     */
    handleModelChange(model) {
        var oldmodels = this.state.models;

        if (oldmodels.find(_model => _model.model === model)) {
            //removes the model from the list
            const index = oldmodels.findIndex(__model => __model.model === model)
            oldmodels.splice(index, 1);
        } else {
            //create new model object with no special color and no highlighing
            const newmodel = {
                model: model,
                style: {
                    color: "#000000",
                    highlighted: "0",
                }
            }

            //add model to list
            oldmodels.push(newmodel);
        }

        //update state
        this.setState({
            models: oldmodels
        })
        console.log(this.state.models)
        this.saveStateAsCookie();
    }
    

    //TODO we can check here if the user is logged in and submit to a different endpoint if that is the case
    /**
     * handles the submit of the request
     *  saves the submitted values as a cookie and redirects
     * @param event 
     */
    handleSubmit(event) {
        event.preventDefault();
        this.saveStateAsCookie();

        //redirect to manipulation site
        this.props.history.push("/manipulation");

    }

    /**
     * saves the current state (by this the settings the user selected) as a cookie
     */
    saveStateAsCookie() {
        const cookie = new Cookies()
        const currDate = new Date();
        const expDate = new Date().setFullYear(currDate.getFullYear() +1);
        let currState = this.state;

        // pType: "tco3_zm",
        //     models: [],
        //     begin: 1970,
        //     end: 2100,
        //     month: [1, 2, 3],
        //     lat_min: -90,
        //     lat_max: 0,


        let saveState = {
            pType: currState.pType,
            models: currState.models,
            begin: currState.begin.toString(),
            end: currState.end.toString(),
            month: currState.month.map(String),
            lat_min: currState.lat_min.toString(),
            lat_max: currState.lat_max.toString(),
            output: "json",
        }
        console.log(saveState);
        //currState['output'] = "json";
        const jsonState = JSON.stringify(saveState);
        cookie.set('plotValues', jsonState, {path: '/', maxAge: expDate});
    }

    /**
     * renders the form
     */
    render() {
        const { pType, models, begin, end, months, lat_min, lat_max } = this.state;

        return (
            <div className="generation-form-wrapper">
                <form onSubmit={this.handleSubmit} className="generation-form">
                        
                        <div className="plot-section-wrapper section-wrapper">
                            <h1>Selected Plot type: {pType}.
                            To change the plot type and draw another plot go back to the generation page or click <Link to="/generation"> here</Link></h1>
                        </div>
                        <ModelController
                            handleChange={this.handleModelChange}
                            selectedModels={models.map(model => {return model.model})}
                            plotType={pType} />
    
    
                    <div className="settings-section-wrapper section-wrapper">
                        <div className="year-section-wrapper section-wrapper">
                            <p className="section-label">Years to plot</p>
                            <YearButton 
                                year={begin}
                                bound="lower"
                                handleYearChange={this.handleLowerYearChange} />
                            <YearButton
                                year={end}
                                bound="upper"
                                handleYearChange={this.handleUpperYearChange} />
                        </div>
                            <MonthsButton
                                months={months}
                                handleChange={this.handleMonthChange} />
                        
                            <LatitudeButton
                                latitude={[lat_min, lat_max]}
                                handleChange={this.handleLatitudeChange} />
                    </div>
                    <input type='submit' value="Submit" className="submit-button mat-style-accent" />
                </form>
            </div>
        );
    }
}


const ManipulationFormWithRouter = withRouter(ManipulationForm);
export default ManipulationFormWithRouter;