import React from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';

import download from 'downloadjs'

import configData from './../../config.json'
import './DownloadSection.css'



function DownloadSection(props) {
    //calculate request url from defaults and current plot type
    let server_url = process.env.REACT_APP_SERVER_URL;
    if (server_url === undefined) {
        console.log("No URL specified for backend, taking default url");
        server_url = configData.SERVER_URL;
        console.log(server_url);
    }
    let request_url = server_url + configData.DOWNLOAD_PATH + "/";

    function downloadPDF() {
        request_url = server_url + configData.DOWNLOAD_PATH + "/";
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

        //const FileDownload = require("js-file-download");

        Axios.post(request_url, request_body, headersConfig)
            .then(request => {
                //FileDownload(request.data, "plot1.pdf");

                const content = request.headers['content-type'];
                download(request.data, "frontend plot.pdf", content)
                //console.log(request.data.slice(request.data.indexOf('>>stream') + 8).split("endstream")[0])

                /*
                var a = document.createElement("a");
                var blob = new Blob(request.blob, {type: "octet/stream"}),
                url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = "plot1.pdf";
                a.click();
                window.URL.revokeObjectURL(url);
                */
            })    //! only for testing
            .catch(error => {
                console.error(error)
            })

        //window.open(server_url + '/download/pdf')
    }

    function downloadPNG() {
        //Find bokeh save button
        let element = document.getElementsByClassName('bk bk-toolbar-button bk-tool-icon-save')[0]
        console.log(element)

        //Create mouse click and release events
        var evt1 = document.createEvent('MouseEvents')
        var evt2 = document.createEvent('MouseEvents')
        evt1.initMouseEvent('mousedown', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        evt2.initMouseEvent('mouseup', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

        //Dispatch events on save button
        element.dispatchEvent(evt1)
        element.dispatchEvent(evt2)
    }

    function downloadCSV() {
        // TODO implement
        //window.open(server_url + '/download/csv')
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