import React from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import { Component } from 'react'

import configData from './../../config.json'
import './DownloadSection.css'


let server_url
class DownloadSection extends Component {
    constructor(props) {
        super(props);

        //calculate request url from defaults and current plot type
        server_url = process.env.REACT_APP_SERVER_URL;
        if (server_url === undefined) {
            console.log("No URL specified for backend, taking default url");
            server_url = configData.SERVER_URL;
            console.log(server_url);
        }

        this.state = {
            activeDownload: false
        }

        this.downloadPDF = this.downloadPDF.bind(this);
        this.downloadCSV = this.downloadCSV.bind(this);
    }
    

    downloadPDF() {
        this.setState({
            activeDownload: true
          })
        let request_url = server_url + configData.DOWNLOAD_PATH + "/";
        request_url += "pdf";
        console.log("Requesting the pdf for this plot:", this.props.plot);

        //header
        const headersConfig = {
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'application/json',
            }
        }
        var request_body = this.props.plot;
        request_body.output = "pdf";

        Axios.post(request_url, request_body, headersConfig)
            .then(request => {
                const url = window.URL.createObjectURL(new Blob([request.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'frontend plot.pdf');
                document.body.appendChild(link);
                link.click();
                
                this.setState({
                    activeDownload: false
                  })
            })
            .catch(error => {
                console.error(error)
            })
    }



    downloadPNG() {
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

    downloadCSV() {
        this.setState({
            activeDownload: true
          })
        let request_url = server_url + configData.DOWNLOAD_PATH + "/";
        request_url += "csv";
        console.log("Requesting the csv for this plot:", this.props.plot);

        //header
        const headersConfig = {
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'application/json',
            }
        }
        var request_body = this.props.plot;
        request_body.output = "csv";

        Axios.post(request_url, request_body, headersConfig)
            .then(request => {
                const url = window.URL.createObjectURL(new Blob([request.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'frontend plot.csv');
                document.body.appendChild(link);
                link.click();

                this.setState({
                    activeDownload: false
                  })
            })
            .catch(error => {
                console.error(error)
            })
    }

    render() {
        console.log(this.state.activeDownload)
        if(this.state.activeDownload) {
            return(
                <div className="download-section">
                    <h2>Download the Plot</h2>
                    <div className="download-button-wrapper">
    
                        {this.props.loggedIn ? 
                            <button onClick={this.downloadPNG} className="mat-style-accent download-button">PNG</button>
                        : 
                            <button className="mat-style-accent-disabled download-button" data-md-tooltip="Not logged in">PNG</button>
                        }
    
                        <button onClick={this.downloadPDF} className="mat-style-accent download-button">PDF</button>
    
                        {this.props.loggedIn ? 
                            <button onClick={this.downloadCSV} className="mat-style-accent download-button">CSV</button>
                        : 
                            <button className="mat-style-accent-disabled download-button" data-md-tooltip="Not logged in">CSV</button>
                        }
                    </div>
    
                    <div className="download-loading-container mat-style">
                        <span>Downloading...</span>
                        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                    </div>
                </div>
            )
        } else {
            return(
                <div className="download-section">
                    <h2>Download the Plot</h2>
                    <div className="download-button-wrapper">
    
                        {this.props.loggedIn ? 
                            <button onClick={this.downloadPNG} className="mat-style-accent download-button">PNG</button>
                        : 
                            <button className="mat-style-accent-disabled download-button" data-md-tooltip="Not logged in">PNG</button>
                        }
    
                        <button onClick={this.downloadPDF} className="mat-style-accent download-button">PDF</button>
    
                        {this.props.loggedIn ? 
                            <button onClick={this.downloadCSV} className="mat-style-accent download-button">CSV</button>
                        : 
                            <button className="mat-style-accent-disabled download-button" data-md-tooltip="Not logged in">CSV</button>
                        }
                    </div>
                </div>
            )
        }
    }
}

DownloadSection.propTypes = {
    plot: PropTypes.any.isRequired,
    loggedIn: PropTypes.bool.isRequired
}

export default DownloadSection