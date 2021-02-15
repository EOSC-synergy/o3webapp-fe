import React from 'react';
import './Manipulation.css';
import Axios from 'axios';
import Cookies from 'universal-cookie';

//url from fake backend for testing local
const plot_api_url = 'http://localhost:5000/plot';

class Manipulation extends React.Component {

    componentDidMount() {
        //retrieve the plot data from a cookie
        const cookie = new Cookies()
        const plotCookie = cookie.get('plotValues')
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
        //! on production change plot_api_url to request_url!
        Axios.post(request_url, plotCookie, headersConfig)
            .then(response => window.Bokeh.embed.embed_item(response.data, 'test-plot'))
            .catch(console.log("didnt get an answer"))  //TODO Implement error when api doenst answer 

    }


    // }

    render() {
        return (
            <div className="ManipulationPageContainer">
                <p>Manipulation Page</p>
                <div id='test-plot' className="bk-root"></div>
    
            </div>
        );
    };
    
}

export default Manipulation;