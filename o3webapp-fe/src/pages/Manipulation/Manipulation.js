import React from 'react';
import Axios from 'axios';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';

import LatitudeButton from '../../components/buttons/LatitudeButton/LatitudeButton';
import MonthsButton from '../../components/buttons/MonthsButton/MonthsButton';
import YearButton from '../../components/buttons/YearButton/YearButton'
import ModelController from '../../components/ModelController/ModelController';
import DownloadSection from '../../components/download/DownloadSection';

import * as Verifier from '../../components/Verifier/Verifier';
import * as URL_Utility from '../../utility/Url_from_env';
import configData from '../../config.json';

import './Manipulation.css';
import './BokehStyling.css';


const BACKEND_SERVER_URL = URL_Utility.getApiUrlFromEnv();
let loggedIn = false

/**
 * Main Manipulation Page
 * wraps the bokeh plot, requests it and lets the user update it
 */
class ManipulationPage extends React.Component {
    constructor(props) {
        super(props)

        let availableModels = [];
        let availableSettings = [];
        let savedErrors = [
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
        ];

        


        //Checks if user is logged in
        const cookies = new Cookies();
        if (cookies.get('egiID') === undefined) {
            loggedIn = false;
        } else {
            loggedIn = true;
        }

        //grap the plot from the cookie
        let plotFromCookie;
        let plot;
        try {
            plotFromCookie = this.getPlotValuesFromCookie('plotValues');
            plot = plotFromCookie;
        } catch (error) {
            //TODO add default behaviour, should it send the user back? Get a plot with default values?
            alert(error.message);
                plot = {
                    pType: configData.GENERATION_DEFAULTS.BEGIN //! Begin cant be right here
                };
        }

        //store all needed values
        this.state = {
            availableModels: availableModels,
            availableSettings: availableSettings,
            savedErrors: savedErrors,
            plot: plot
        };

        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleLowerYearChange = this.handleLowerYearChange.bind(this);
        this.handleUpperYearChange = this.handleUpperYearChange.bind(this);
        this.handleMonthChange = this.handleMonthChange.bind(this);
        this.handleLatitudeChange = this.handleLatitudeChange.bind(this);
        this.handlePlotTypeChange = this.handlePlotTypeChange.bind(this);
        this.handleModelChange = this.handleModelChange.bind(this);
        this.saveStateAsCookie = this.saveStateAsCookie.bind(this);
    }

    componentDidMount() {
        this.fetchPlotFromApi();

        //TODO refractor in own method (also in generation)
        //* START REFRACTOR
        //grap models from backend
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
        }
        console.log(request_url, requestOptions, requestBody)

        Axios.post(request_url, requestBody, requestOptions)
            //.then(response => console.log(response.data))    
            .then(response => this.setState({ 
                availableModels: response.data.models, 
                availableSettings: response.data.vars
            }))
            .catch(error => console.error(error));

        //* END REFRACTOR
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
            Verifier.verifyLatitude(lat_min, lat_max)
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

        let oldPlot = this.state.plot
        oldPlot.begin = year

        this.setState({
            plot: oldPlot,
            savedErrors: errorArray

        })
        this.saveStateAsCookie();
    }

    /**
     * Handles updating the state for the upper year
     * @param {number} year - entered year
     */
     handleUpperYearChange(year) {
        //save error array from state to allow manipulation
        const errorArray = this.state.savedErrors

        try {
            Verifier.verifyYear(this.state.plot.begin, year);
            //clear model errors if no error was found
            errorArray.find(error => error.key === "year").error = undefined;
        } catch(error) {
            console.error(error.message);
            errorArray.find(error => error.key === "year").error = error;
        }

        let oldPlot = this.state.plot;
        oldPlot.end = year;
        this.setState({
            plot: oldPlot,
            savedErrors: errorArray
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

        let oldPlot = this.state.plot;
        oldPlot.models = oldmodels;
        //update state
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
     * @param event 
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
            window.location.reload();
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

    //TODO rework so it just returns the cookie in all cases and you can just specify the name
    /**
     * Reads the stored plot from the cookie
     * @returns plotCookie - the selected plot read from the cookie
     */
    getPlotValuesFromCookie(cookieName) {
        const cookie = new Cookies();
        const plotCookie = cookie.get(cookieName);

        if (plotCookie === null || plotCookie === undefined) {
            throw new Error("Could not parse cookie");
        } else {
            return plotCookie;
        }
    }

    /**
     * Access the Api to get and embed the current plot as a bokeh object
     */
    fetchPlotFromApi() {
        //receives the plot from the api and inserts the plot
        const { plot }= this.state
        const headersConfig = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const request_url = BACKEND_SERVER_URL + configData.PLOT_PATH + "/" + plot.pType;
        Axios.post(request_url, plot, headersConfig)
            .then(response => window.Bokeh.embed.embed_item(response.data, 'test-plot'));
    }

    render() {
        const { pType, models, begin, end, months, lat_min, lat_max } = this.state.plot;
        const { availableModels, availableSettings } = this.state;


        const plot = this.state.plot ;

        return (
            <div className="ManipulationPageContainer">
                <div className="plot-and-download-wrapper">
                    <div className="plot-section-wrapper section-wrapper">
                                <h2>Selected Plot type: <span className="plot-type">{plot.pType}</span></h2>
                                <h3>To change the plot type and draw another plot go back to the generation page or click <Link to="/generation" className="mat-style-accent"> here</Link></h3>
                    </div>

                    <div id='test-plot' className="bk-root"></div>

                    <DownloadSection loggedIn={loggedIn} plot={plot}/>
                </div>

                <div className="manipulation-form-wrapper">
                <form onSubmit={this.handleSubmit} className="manipulation-form">
                        
                       
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

export default ManipulationPage;