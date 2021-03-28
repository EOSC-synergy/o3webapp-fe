import Axios from 'axios';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import Cookies from 'universal-cookie';

import LatitudeButton from '../../components/buttons/LatitudeButton/LatitudeButton';
import MonthsButton from '../../components/buttons/MonthsButton/MonthsButton';
import PlotButtonController from '../../components/buttons/PlotButton/PlotButtonController';
import YearButton from '../../components/buttons/YearButton/YearButton';
import ModelController from '../../components/ModelController/ModelController';

import * as Verifier from '../../utility/Verifier/Verifier';
import configData from '../../config.json';
import * as URL_Utility from '../../utility/Url_from_env';

import './Generation.css';

const BACKEND_SERVER_URL = URL_Utility.getApiUrlFromEnv();

/**
 * Main Generation Page
 * wraps all buttons and features needed to let the user request a plot
 */
class GenerationPage extends React.Component {

    /**
     * @constructor
     * @override
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
            savedErrors: [
                {
                    key: "model",
                    error: undefined,
                },
                {
                    key: "year",
                    error: undefined,
                },
                {
                    key: "month",
                    error: undefined,
                },
                {
                    key: "latitude",
                    error: undefined,
                }

            ]
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
        this.fetchModelsFromApi();
    }

    /**
     * reads the models form the api for the current plot type
     */
     fetchModelsFromApi() {
        const currplotType = this.state.plot.pType;

        const request_url = BACKEND_SERVER_URL + configData.MODEL_LIST_PATH + '/' + currplotType;

        //gets the models from the backend
        const requestOptions = {
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: 5000
        };

        const requestBody = {
            pType: currplotType
        };

        Axios.post(request_url, requestBody, requestOptions)
            //.then(response => console.log(response.data))    
            .then(response => this.setState({
                availableModels: response.data.models,
                availableSettings: response.data.vars
            }))
            .catch(error => console.error(error));
    }

    /**
     * updates the state with the new plotType
     * @param {String} plotType - new plotType
     */
    handlePlotTypeChange(plotType) {
        let oldPlot = this.state.plot
        oldPlot.pType = plotType
        this.setState({
            plot: oldPlot
        })
        this.saveStateAsCookie();

        //TODO readd logic to reload page on plot change and show correct plot type and models
        //TODO also in Manipulation
    }

    /**
     * Updates the state with the new latitude range
     * @param {Number[]} latitude_array - new latitude range
     */
    handleLatitudeChange(latitude_array) {
        const errorArray = this.state.savedErrors;
        
        var lat_min = (latitude_array[0] !== undefined) ? latitude_array[0] : configData.GENERATION_DEFAULTS.LAT_MIN;
        var lat_max = (latitude_array[1] !== undefined) ? latitude_array[1] : configData.GENERATION_DEFAULTS.LAT_MAX;

        try {
            Verifier.verifyLatitude(lat_min, lat_max);
            errorArray.find(error => error.key === "latitude").error = undefined;
        } catch(error) {
            console.error(error.message);
            errorArray.find(error => error.key === "month").error = error;
        }

        let oldPlot = this.state.plot;
        oldPlot.lat_min = lat_min;
        oldPlot.lat_max = lat_max;

        this.setState({
            plot: oldPlot,
            savedErrors: errorArray
        })
        this.saveStateAsCookie();
    }

    /**
     * Updates the state with the new months
     * @param {Number[]} new_months - new selected months 
     */
    handleMonthChange(new_months) {
        const errorArray = this.state.savedErrors;

        try {
            Verifier.verifyMonths(new_months);
            errorArray.find(error => error.key === "month").error = undefined;
        } catch(error) {
            console.error(error.message);
            errorArray.find(error => error.key === "month").error = error;
        }

        let oldPlot = this.state.plot;
        oldPlot.month = new_months;

        this.setState({
            plot: oldPlot,
            savedErrors: errorArray
        });

        this.saveStateAsCookie();
    }

    /**
     * Updates the state with the new lower year border
     * @param {Number} year - new lower year border
     */
    handleLowerYearChange(year) {
        //save error array from state to allow manipulation
        const errorArray = this.state.savedErrors

        try {
            Verifier.verifyYear(year, this.state.plot.end);
            //clear model errors if no error was found
            errorArray.find(error => error.key === "year").error = undefined;
        } catch(error) {
            //log and add the thrown error 
            console.error(error.message);
            errorArray.find(error => error.key === "year").error = error;   
        }

        //save the old plot to allow manipulation
        let oldPlot = this.state.plot;
        //update year in plot
        oldPlot.begin = year;

        //update state with new plot and new errors (even if none are found, delete old ones)
        this.setState({
            plot: oldPlot,
            savedErrors: errorArray
        })

        //save the state
        this.saveStateAsCookie();
    }

    /**
     * Handles updating the state for the upper year
     * @param {number} year - entered year
     */
    handleUpperYearChange(year) {
        //save error array from state to allow manipulation
        const errorArray = this.state.savedErrors

        //verify that input is correct
        try {
            Verifier.verifyYear(this.state.plot.begin, year);
            //clear model errors if no error was found
            errorArray.find(error => error.key === "year").error = undefined;
        } catch(error) {
            //log and add the thrown error 
            console.error(error.message);
            errorArray.find(error => error.key === "year").error = error;          
        }

        //save the old plot to allow manipulation
        let oldPlot = this.state.plot;
        //update year in plot
        oldPlot.end = year;

        //update state with new plot and new errors (even if none are found, delete old ones)
        this.setState({
            plot: oldPlot,
            savedErrors: errorArray
        })
        //save the state
        this.saveStateAsCookie();
    }

    /**
     * updates the state with the selcted models. Inserts the object needed for the backend instead of the string
     * @param model the selected model as string
     */
    handleModelChange(model) {
        //save oldmodels to allow manipulation
        var oldmodels = this.state.plot.models;

        //try to find the clicked model
        if (oldmodels.find(_model => _model.model === model)) {
            //removes the model from the list if found (user deselected it then)
            const index = oldmodels.findIndex(__model => __model.model === model)
            oldmodels.splice(index, 1);
        } else {
            //create new model object with no special color and no highlighing (user selected the model)
            const newmodel = {
                model: model,
                style: {
                    color: "#000000",
                    highlighted: "0",
                }
            }
            // TODO add color mapping for that model

            //add model to list
            oldmodels.push(newmodel);
        }

        //verify that at least one model is selected

        const errorArray = this.state.savedErrors
        try {
            Verifier.verifyModels(oldmodels);
            //clear model errors
            errorArray.find(error => error.key === "model").error = undefined;
        } catch(error) {
            //log and add the thrown error 
            console.error(error.message);
            errorArray.find(error => error.key === "model").error = error;          
        }

        //update state
        let oldPlot = this.state.plot;
        oldPlot.models = oldmodels;

        this.setState({
            plot: oldPlot,
            savedErrors: errorArray
        })
        this.saveStateAsCookie();
    }
    

    //TODO we can check here if the user is logged in and submit to a different endpoint if that is the case
    /**
     * handles the submit of the request
     *  saves the submitted values as a cookie and redirects
     * @param event - the button that triggered the event
     */
    handleSubmit(event) {
        event.preventDefault();
        this.saveStateAsCookie();
        const errors = this.state.savedErrors;
        const error = errors.find(err => err.error !== undefined);
        if (error !== undefined) {
            console.error(error.error.message);
            alert(error.error.message);
        } else {
            console.log("No error found");
            //redirect to manipulation site
            this.props.history.push("/manipulation");
        }
        
    }

    /**
     * saves the current state (by this the settings the user selected) as a cookie
     */
    saveStateAsCookie() {
        const cookie = new Cookies()
        const currDate = new Date();
        const expDate = new Date().setFullYear(currDate.getFullYear() +1);
        let currPlot = this.state.plot;


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
        const jsonPlot = JSON.stringify(savePlot);
        cookie.set('plotValues', jsonPlot, {path: '/', maxAge: expDate});
    }

    render() {
        const { pType, models, begin, end, months, lat_min, lat_max } = this.state.plot;
        const { availableModels, availableSettings } = this.state;
        return (
            <div className="generation-container">
                <div className="generation-form-wrapper">
                <form onSubmit={this.handleSubmit} className="generation-form">
                        <PlotButtonController
                            handleChange={this.handlePlotTypeChange} />
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
            </div>
        );
    }
}

GenerationPage.propTypes = {
    history: PropTypes.history
}

//allow history.push by wrapping in withRouter
const GenerationPageWithRouter = withRouter(GenerationPage);
export default GenerationPageWithRouter;
