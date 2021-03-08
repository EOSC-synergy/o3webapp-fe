import React from 'react';
import './Manipulation.css';
import './BokehStyling.css';
import Axios from 'axios';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';

import ManipulationFormWithRouter from '../../components/forms/Manipulationform';
import DownloadSection from '../../components/download/DownloadSection';

import configData from '../../config.json';

//url from fake backend for testing local
const plot_api_url = configData.SERVER_URL + configData.PLOT_PATH;

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
        if (cookies.get('userID') === undefined) {
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