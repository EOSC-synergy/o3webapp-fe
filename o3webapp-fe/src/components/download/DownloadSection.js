import React from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import { Component } from 'react'
import configData from './../../config.json'
import './DownloadSection.css'


//                         {this.props.loggedIn ? 
//                            <button onClick={this.downloadPNG} className="mat-style-accent download-button">PNG</button>
//                        :
//                            <button className="mat-style-accent-disabled download-button" data-md-tooltip="Not logged in">PNG</button>
//                        }


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

        this.downloadPDF = this.downloadSVG.bind(this);
        this.downloadCSV = this.downloadCSV.bind(this);
        this.downloadPNG = this.downloadPNG.bind(this);
    }

    // skip for now // vkoz
    downloadPDF_() {
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
 
        var request_body = this.props.plot //this.props.plot;

        console.log("PDF request body:", request_body)
        request_body.output = "pdf";

        Axios.post(request_url, request_body, headersConfig)
            .then(request => {
                const url = window.URL.createObjectURL(new Blob([request.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'o3as_plot.pdf');
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

    downloadSVG() {
        // NEED BOKEH BACKEND TO BE SVG ! //vkoz
        var testplot = document.getElementById('test-plot')
        var svg_data = testplot.getElementsByTagName('svg')[0].outerHTML;
        var blob = new Blob([svg_data], {type: 'image/svg+xml;charset=utf-8'});
        var filename = 'o3as_plot.svg';
        if(window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveBlob(blob, filename);
        }
        else{
            var elem = window.document.createElement('a');
            let URL = window.URL || window.webkitURL || window;
            elem.href = URL.createObjectURL(blob);
            elem.download = filename;        
            document.body.appendChild(elem);
            elem.click();        
            document.body.removeChild(elem);
        }
    }

    downloadPNG() {
        // inspired by
        // https://levelup.gitconnected.com/draw-an-svg-to-canvas-and-download-it-as-image-in-javascript-f7f7713cf81f
        let testplot = document.getElementById('test-plot')
        let svg_elem = testplot.getElementsByTagName('svg')[0];
        svg_elem.getBoundingClientRect();
        let svg_width = svg_elem.width.baseVal.value;
        let svg_height = svg_elem.height.baseVal.value;
        let svg_data = new XMLSerializer().serializeToString( svg_elem );
        var blob_svg = new Blob([svg_elem.outerHTML], {type: 'image/svg+xml;charset=utf-8'});

        let URL = window.URL || window.webkitURL || window;
        let svgURL = URL.createObjectURL(blob_svg);
        console.log("svg_data:", svg_data);
        console.log("svg_width:", svg_width);
        console.log("svg_height:", svg_height);

        //=> working from 2nd click:
        let img = new Image();
        img.addEventListener('load', function () {
            return URL.revokeObjectURL(svgURL);
        }, { once: true });
        img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg_data)));
        let canvas = document.createElement('canvas');
        canvas.width = 1280; //svg_width;
        canvas.height = 640; //svg_height;
        let ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, 1280, 640);
        //<= working from second click

        //function load_img(img, svg, ctx) {
        //    img.setAttribute("src", "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg))) );
        //    img.onload = function() {
        //    // draw image in canvas starting left-0 , top - 0  
        //    ctx.drawImage(img, 0, 0, 1280, 640);
        //  }
        //}

        let png_data = canvas.toDataURL("image/png"); // default png
        console.log("png_data:", png_data);
        let blob_png = new Blob([png_data], {type: 'image/png'});
        let filename = 'o3as_plot.png';
        if(window.navigator.msSaveOrOpenBlob) {
           window.navigator.msSaveBlob(blob_png, filename);
        }
        else{
           let elem = window.document.createElement('a');
           //let URL = window.URL || window.webkitURL || window;
           elem.href = png_data; //URL.createObjectURL(blob_png);
           elem.style.opacity = "0";
           elem.download = filename;        
           document.body.appendChild(elem);
           elem.click();        
           document.body.removeChild(elem);
        }
    }

    downloadPNG_() {
        //Find bokeh save button
        // IF Bokeh BACKEND IS PNG!
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
                link.setAttribute('download', 'o3as_data.csv');
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
                    <h2>Download the Plot / Data</h2>
                    <div className="download-button-wrapper">

                        <button onClick={this.downloadSVG} className="mat-style-accent download-button">SVG</button>

                         {this.props.loggedIn ? 
                            <button onClick={this.downloadCSV} className="mat-style-accent download-button">CSV (raw)</button>
                        :
                           <button className="mat-style-accent-disabled download-button" data-md-tooltip="Not logged in">CSV (raw)</button>
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
                    <h2>Download the Plot / Data</h2>
                    <div className="download-button-wrapper">

                        <button onClick={this.downloadSVG} className="mat-style-accent download-button">SVG</button>

                         {this.props.loggedIn ? 
                            <button onClick={this.downloadCSV} className="mat-style-accent download-button">CSV (raw)</button>
                        :
                           <button className="mat-style-accent-disabled download-button" data-md-tooltip="Not logged in">CSV (raw)</button>
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