import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import Axios from 'axios';

import LatitudeButton from '../buttons/LatitudeButton/LatitudeButton';
import MonthsButton from '../buttons/MonthsButton/MonthsButton';
import YearButton from '../buttons/YearButton/YearButton'
import ModelController from '../ModelController/ModelController';
import * as Verifier from '../Verifier/Verifier';

import './Generationform.css';

import configData from '../../config.json';





class ManipulationForm extends React.Component {
     /**
     * @constructor
     */
    constructor(props) {
        super(props);
        this.state = {
            plot: {
                pType: configData.GENERATION_DEFAULTS.PLOT_TYPE,
                models: configData.GENERATION_DEFAULTS.MODELS,
                begin: configData.GENERATION_DEFAULTS.BEGIN,
                end: configData.GENERATION_DEFAULTS.END,
                month: configData.GENERATION_DEFAULTS.MONTH,
                lat_min: configData.GENERATION_DEFAULTS.LAT_MIN,
                lat_max: configData.GENERATION_DEFAULTS.LAT_MAX, 
            },
            availableModels: [],
            availableSettings: [],
            error: []
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

    /**
     * @override
     * Calls the backend to receive a list with all available models
     * and settings and saves it as state
     */
    componentDidMount() {
        const currplotType = this.state.plot.pType;
        const model_list_url = configData.SERVER_URL + configData.MODEL_LIST_PATH;
        const request_url = model_list_url + '/' + currplotType;

        //gets the models from the backend
        const requestOptions = {
            headers: { 
                'Content-Type': 'application/json',
            },
            timeout: 5000
        };

        const requestBody = {
            pType: currplotType
        }

        console.log(request_url, requestOptions, requestBody)

        Axios.post(request_url, requestBody, requestOptions)
            //.then(response => console.log(response.data))    
            .then(response => this.setState({ 
                availableModels: response.data.models, 
                availableSettings: response.data.vars
            }))
            .catch(error => console.error(error));
    }


    handlePlotTypeChange(plotType) {
        console.log(plotType);
        let oldPlot = this.state.plot
        oldPlot.pType = plotType
        this.setState({
            plot: oldPlot
        })
        this.saveStateAsCookie();
    }

    /**
     * Updates the state with the new latitude range
     * @param {Number[]} latitude_array - new latitude range
     */
    handleLatitudeChange(latitude_array) {
        console.log("Updated Lattitude:", latitude_array);
        var lat_min = (latitude_array[0] !== undefined) ? latitude_array[0] : configData.GENERATION_DEFAULTS.LAT_MIN;
        var lat_max = (latitude_array[1] !== undefined) ? latitude_array[1] : configData.GENERATION_DEFAULTS.LAT_MAX;
        
        try {
            Verifier.verifyLatitude(lat_min, lat_max)
        } catch(error) {
            this.setState({
                error: error
            })
        }

        let oldPlot = this.state.plot;
        oldPlot.lat_min = lat_min;
        oldPlot.lat_max = lat_max;

        this.setState({
            plot: oldPlot
        })
        this.saveStateAsCookie();
    }

    /**
     * Updates the state with the new months
     * @param {Number[]} new_months - new selected months 
     */
    handleMonthChange(new_months) {
        console.log(new_months);

        try {
            Verifier.verifyMonths(new_months);
        } catch(error) {
            console.error(error.message);
        }

        let oldPlot = this.state.plot;
        oldPlot.month = new_months;

        this.setState({
            plot: oldPlot
        });

        this.saveStateAsCookie();
    }

    /**
     * Updates the state with the new lower year border
     * @param {Number} year - new lower year border
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
        try {
            Verifier.verifyYear(year, this.state.plot.end);
        } catch(error) {
            console.error(error.message);
        }

        let oldPlot = this.state.plot
        oldPlot.begin = year

        this.setState({
            plot: oldPlot
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

        try {
            Verifier.verifyYear(this.state.plot.begin, year);
        } catch(error) {
            console.error(error.message);
        }

        let oldPlot = this.state.plot;
        oldPlot.end = year;
        this.setState({
            plot: oldPlot
        })
        this.saveStateAsCookie();
    }

    /**
     * updates the state with the selcted models. Inserts the object needed for the backend instead of the string
     * @param model the selected model as string
     */
    handleModelChange(model) {
        var oldmodels = this.state.plot.models;

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

        let oldPlot = this.state.plot;
        oldPlot.models = oldmodels;
        //update state
        this.setState({
            plot: oldPlot
        })
        console.log(this.state.plot.models)
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
        let currPlot = this.state.plot;

        // pType: "tco3_zm",
        //     models: [],
        //     begin: 1970,
        //     end: 2100,
        //     month: [1, 2, 3],
        //     lat_min: -90,
        //     lat_max: 0,


        let savePlot = {
            pType: currPlot.pType,
            models: currPlot.models,
            begin: currPlot.begin.toString(),
            end: currPlot.end.toString(),
            month: currPlot.month.map(String),
            lat_min: currPlot.lat_min.toString(),
            lat_max: currPlot.lat_max.toString(),
            output: "json",
        }
        console.log("Saving plot:", savePlot);
        const jsonPlot = JSON.stringify(savePlot);
        cookie.set('plotValues', jsonPlot, {path: '/', maxAge: expDate});
    }

    /**
     * renders the form
     */
    render() {
        const { pType, models, begin, end, months, lat_min, lat_max } = this.state.plot;
        const { availableModels, availableSettings } = this.state;
        console.log("Available settings:", availableSettings)
        
        console.log("Available models:", availableModels)

        return (
            <div className="generation-form-wrapper">
                <form onSubmit={this.handleSubmit} className="generation-form">
                        
                       
                    {availableSettings.some(setting => setting.name === "model") &&
                        <ModelController
                            handleChange={this.handleModelChange}
                            selectedModels={models.map(model => {return model.model})}
                            availableModels={availableModels}
                            plotType={pType} />
                    }
    
                    <div className="settings-section-wrapper section-wrapper">
                        <div className="year-section-wrapper section-wrapper">
                            {availableSettings.some(setting => setting.name === "begin" || setting.name === "end") &&
                                <div>
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
                            }
                        </div>
                            {availableSettings.some(setting => setting.name === "month") &&
                                <MonthsButton
                                    months={months}
                                    handleChange={this.handleMonthChange} />
                            }
                            {availableSettings.some(setting => setting.name === "lat_min" || setting.name === "lat_max") &&
                                <LatitudeButton
                                    latitude={[lat_min, lat_max]}
                                    handleChange={this.handleLatitudeChange} />
                            }
                    </div>
                    <input type='submit' value="Submit" className="submit-button mat-style-accent" />
                </form>
            </div>
        );
    }
}

ManipulationForm.propTypes = {
    history: PropTypes.history
}

const ManipulationFormWithRouter = withRouter(ManipulationForm);
export default ManipulationFormWithRouter;