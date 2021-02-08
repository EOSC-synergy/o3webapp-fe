import React from 'react';
import './Manipulation.css';
import { embed } from '@bokeh/bokehjs';

const plot_api_url = 'http://localhost:8081/api/plot';

class Manipulation extends React.Component {

    componentDidMount() {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                //'Accept': 'application/json' 
            },
        };
        // const response = await fetch(plot_api_url, requestOptions)
        // const item = await response.json()
        // embed.embed_item(item, 'test-plot')
        console.log("calling api")
        fetch(plot_api_url, requestOptions)
            .then(response => response.json())
            .then(data => embed.embed_item(data, 'test-plot'))
            .then(console.log("called api"))
    }


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