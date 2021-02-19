import React from 'react';
import './Manipulation.css';
import Axios from 'axios';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';

import ManipulationFormWithRouter from '../../components/forms/Manipulationform';
import { DownloadSection } from '../../components/download/DownloadSection';

import configData from '../../config.json';

//url from fake backend for testing local
const plot_api_url = configData.SERVER_URL + configData.PLOT_PATH;

class Manipulation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            plot: {
                pType: configData.GENERATION_DEFAULTS.PLOT_TYPE,
            }
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
                <div id='test-plot' className="bk-root"></div>

                <div className="plot-section-wrapper section-wrapper">
                            <h2>Selected Plot type: {plot.pType}.
                            To change the plot type and draw another plot go back to the generation page or click <Link to="/generation"> here</Link></h2>
                </div>


                <DownloadSection plot={plot}/>
                </div>

                <ManipulationFormWithRouter />
            </div>
        );
    };
    
}

export default Manipulation;