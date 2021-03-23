import React from 'react';
import './Manipulation.css';
import './BokehStyling.css';
import Axios from 'axios';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';

import ManipulationFormWithRouter from '../../components/forms/Manipulationform';
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
            plot: {
                pType: configData.GENERATION_DEFAULTS.PLOT_TYPE,
            }
        }

        //Checks if user is logged in
        const cookies = new Cookies();
        if (cookies.get('egiID') === undefined) {
            loggedIn = false
        } else {
            loggedIn = true
        }
    }

    componentDidMount() {
        //retrieve the plot data from a cookie
        const cookie = new Cookies()
        const plotCookie = cookie.get('plotValues')
        this.setState({
            plot: plotCookie,
        })
        if (plotCookie === null || plotCookie === undefined) {
            //if no cookie was set with values for the plot do ...
            //TODO add default behaviour, should it send the user back? Get a plot with default values?
            console.log("no cookie was set");
        } else {
            console.log(plotCookie)

        }


        //receives the plot from the api and inserts the plot
        console.log('fetching from api')
        const headersConfig = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        
        const request_url = plot_api_url + "/" + plotCookie.pType;
        console.log(request_url)
        Axios.post(request_url, plotCookie, headersConfig)
            .then(response => window.Bokeh.embed.embed_item(response.data, 'test-plot'))


        //After bokeh module has loaded in, find buttons to add tooltips
        setTimeout(function() {

            //Header Buttons
            let header_element = document.getElementsByClassName('mmt_header')[0]
            let elements = header_element.childNodes[0].childNodes
            for (let e of elements) {
                e.setAttribute('data-md-tooltip-header', 'Generate')
            }

            //Title Buttons
            let title_elements = document.getElementsByClassName('mmt_title')
            for (let e of title_elements) {
                if (e.childNodes[0].childNodes[0].classList.contains('bk-btn-success')) {
                    e.setAttribute('data-md-tooltip-title', 'Deselect')
                } else {
                    e.setAttribute('data-md-tooltip-title', 'Select')
                }
            }

            //Delete Buttons
            let del_elements = document.getElementsByClassName('mmt_del')
            for (let e of del_elements) {
                e.setAttribute('data-md-tooltip-del', 'Delete')
            }

            //Model Buttons
            let model_elements = document.getElementsByClassName('mmt')
            for (let e of model_elements) {
                e.setAttribute('data-md-tooltip-model', 'Remove')
            }
            
        }.bind(this), 7000)

    }


    // }

    render() {
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

                <ManipulationFormWithRouter />
            </div>
        );
    }
    
}

export default Manipulation;