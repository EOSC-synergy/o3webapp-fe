import React from 'react';
import LatitudeButton from '../buttons/LatitudeButton/LatitudeButton';
import MonthsButton from '../buttons/MonthsButton/MonthsButton';
import PlotButtonController from '../buttons/PlotButton/PlotButtonController';
import YearButton from '../buttons/YearButton/YearButton'
import ModelController from '../ModelController/ModelController';
import { withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';


class GenerationForm extends React.Component {
    /**
     * @constructor
     */
    constructor(props) {
        super(props);
        this.state = {
            pType: "tco3_zm",
            models: [],
            begin: 1970,
            end: 2100,
            months: [1, 2, 3],
            lat_min: -90,
            lat_max: 0,
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
        this.setState({
            lat_min: latitude_array[0],
            lat_max: latitude_array[1],
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
            const index = oldmodels.indexOf(model);
            oldmodels.splice(index, 1);
        } else {
            //create new model object with no special color and no highlighing
            const newmodel = {
                model: model,
                style: {
                    color: "",
                    highlighted: "",
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
        const currState = this.state;
        const jsonState = JSON.stringify(currState);
        cookie.set('plotValues', jsonState, {path: '/', maxAge: expDate});
    }

    /**
     * renders the form
     */
    render() {
        const { pType, models, begin, end, months, lat_min, lat_max } = this.state;

        return (
            <div className="generation-form-wrapper">
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <PlotButtonController
                            handleChange={this.handlePlotTypeChange} />
                    </div>
    
                    <div>
                        <ModelController
                            handleChange={this.handleModelChange}
                            selectedModels={models.map(model => {return model.model})}
                            plotType={pType} />
                    </div>
    
    
                    <div>
                        <YearButton 
                            year={begin}
                            bound="lower"
                            handleYearChange={this.handleLowerYearChange} />
                        <YearButton
                            year={end}
                            bound="upper"
                            handleYearChange={this.handleUpperYearChange} />
                    </div>
                    <br />
    
                    <div>
                        <MonthsButton
                            months={months}
                            handleChange={this.handleMonthChange} />
                    </div>
                    <div>
                        <LatitudeButton
                            latitude={[lat_min, lat_max]}
                            handleChange={this.handleLatitudeChange} />
                    </div>
                    <br />
                    <input type='submit' value="Submit" />
                </form>
            </div>
        );
    }
}

const GenerationFormWithRouter = withRouter(GenerationForm)

export default GenerationFormWithRouter;