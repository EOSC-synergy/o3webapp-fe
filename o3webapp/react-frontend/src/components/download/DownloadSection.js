import Axios from 'axios';

import configData from './../../config.json'




export function DownloadSection(props) {
    //calculate request url from defaults and current plot type
    const request_url = configData.SERVER_URL + configData.PLOT_PATH + "/" + props.plot.pType;

    function downloadPDF() {
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
        <div>
            <h2>Download the Plot</h2>
            <button onClick={downloadPNG} >PNG</button>
            <button onClick={downloadPDF} >PDF</button>
            <button onClick={downloadCSV} >CSV</button>
        </div>
    )
}