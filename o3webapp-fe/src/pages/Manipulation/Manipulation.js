import React from 'react';
import './Manipulation.css';
import './BokehStyling.css';
import Axios from 'axios';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import LatitudeButton from '../../components/buttons/LatitudeButton/LatitudeButton';
import MonthsButton from '../../components/buttons/MonthsButton/MonthsButton';
import YearButton from '../../components/buttons/YearButton/YearButton'
import ModelController from '../../components/ModelController/ModelController';
import * as Verifier from '../../components/Verifier/Verifier';

//import ManipulationFormWithRouter from '../../components/forms/Manipulationform';
import DownloadSection from '../../components/download/DownloadSection';

import configData from '../../config.json';


let server_url = process.env.REACT_APP_SERVER_URL;
        if (server_url === undefined) {
            console.log("No URL specified for backend, taking default url");
            server_url = configData.SERVER_URL;
            console.log(server_url);
        }
        console.log(server_url);
const plot_api_url = server_url + configData.PLOT_PATH;

let loggedIn = false

class Manipulation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            availableModels: [],
            availableSettings: [],
            error: []
        }

        // this.handleSubmit = this.handleSubmit.bind(this);

        // this.handleLowerYearChange = this.handleLowerYearChange.bind(this);
        // this.handleUpperYearChange = this.handleUpperYearChange.bind(this);
        // this.handleMonthChange = this.handleMonthChange.bind(this);
        // this.handleLatitudeChange = this.handleLatitudeChange.bind(this);
        // this.handlePlotTypeChange = this.handlePlotTypeChange.bind(this);
        // this.handleModelChange = this.handleModelChange.bind(this);
        // this.saveStateAsCookie = this.saveStateAsCookie.bind(this);


        //Checks if user is logged in
        const cookies = new Cookies();
        if (cookies.get('egiID') === undefined) {
            loggedIn = false
        } else {
            loggedIn = true
        }

        //grap the plot from the cookie and store it
        let plotFromCookie;
        try {
            plotFromCookie = this.getPlotValuesFromCookie();
            this.state = {
                plot: plotFromCookie
            }
        } catch (error) {
            //TODO add default behaviour, should it send the user back? Get a plot with default values?
            alert(error.message);
            this.state = {
                plot: {
                    pType: configData.GENERATION_DEFAULTS.BEGIN
                }
            }
        }
        console.log(plotFromCookie);
    }

    componentDidMount() {
       this.fetchPlotFromApi();

       //grap models from backend
       const currplotType = this.state.plot.pType;
        let server_url = process.env.REACT_APP_SERVER_URL;
        if (server_url === undefined) {
            console.log("No URL specified for backend, taking default url");
            server_url = configData.SERVER_URL;
            console.log(server_url);
        }
        console.log(server_url);
        const model_list_url = server_url + configData.MODEL_LIST_PATH;
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
     * Reads the stored plot from the cookie
     * @returns plotCookie - the selected plot read from the cookie
     */
    getPlotValuesFromCookie() {
        const cookie = new Cookies();
        const plotCookie = cookie.get('plotValues');

        if (plotCookie === null || plotCookie === undefined) {
            throw new Error("Could not parse cookie");
        } else {
            console.log("Cookie was successfully read, plot is: ", plotCookie);
            return plotCookie;
        }
    }

    /**
     * Access the Api to get and embed the current plot as a bokeh object
     */
    fetchPlotFromApi() {
        //receives the plot from the api and inserts the plot
        const { plot }= this.state
        console.log("Requesting this plot: ", plot);

        console.log('fetching from api');
        const headersConfig = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const request_url = plot_api_url + "/" + plot.pType;
        console.log(request_url);
        Axios.post(request_url, plot, headersConfig)
            .then(response => window.Bokeh.embed.embed_item(response.data, 'test-plot'));
    }

    render() {
        const { pType, models, begin, end, months, lat_min, lat_max } = this.state.plot;
        const { availableModels, availableSettings } = this.state;
        console.log("Available settings:", availableSettings)
        
        console.log("Available models:", availableModels)


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
            </div>
        );
    }
    
}

Manipulation.propTypes = {
    history: PropTypes.history
}

export default Manipulation;