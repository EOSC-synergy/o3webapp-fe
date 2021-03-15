import React from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';

import configData from './../../config.json'
import './DownloadSection.css'



function DownloadSection(props) {
    //calculate request url from defaults and current plot type
    let request_url = configData.SERVER_URL + configData.DOWNLOAD_PATH + "/";

    function downloadPDF() {
        request_url += "pdf";
        console.log("Requesting the pdf for this plot:", props.plot);
        //header
        const headersConfig = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        var request_body = props.plot;
        request_body.output = "pdf";

        Axios.post(request_url, request_body, headersConfig)
            .then(request => console.log(request.data));    //! only for testing
    }

    function downloadPNG() {
        request_url += "png";
        console.log("Requesting the png for this plot:", props.plot);
        //header
        const headersConfig = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        var request_body = props.plot;
        request_body.output = "png";

        Axios.post(request_url, request_body, headersConfig)
            .then(request => console.log(request.data));    //! only for testing
    }

    function downloadCSV() {
        // TODO implement
        console.error("Not yet implemented")
    }

    return (
        <div className="download-section">
            <h2>Download the Plot</h2>
            <div className="download-button-wrapper">

                {props.loggedIn ? 
                    <button onClick={downloadPNG} className="mat-style-accent download-button">PNG</button>
                : 
                    <button className="mat-style-accent-disabled download-button" data-md-tooltip="Not logged in">PNG</button>
                }

                <button onClick={downloadPDF} className="mat-style-accent download-button">PDF</button>

                {props.loggedIn ? 
                    <button onClick={downloadCSV} className="mat-style-accent download-button">CSV</button>
                : 
                    <button className="mat-style-accent-disabled download-button" data-md-tooltip="Not logged in">CSV</button>
                }
            </div>
        </div>
    )
}

DownloadSection.propTypes = {
    plot: PropTypes.any.isRequired,
    loggedIn: PropTypes.bool.isRequired
}

export default DownloadSection