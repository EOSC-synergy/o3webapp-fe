import React from 'react';
import ModelButton from '../buttons/ModelButton/ModelButton'

//*change this to the production api for production builds
//currently this runs with
const model_list_url = 'http://localhost:8081/api/list-models';
//const model_list_url = 'http://o3api.test.fedcloud.eu:30505/api/list_models';


/**
 * Controller for the Models
 * @param props.availableModels all available models the user can choose from
 */
class ModelController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            availableModels: [],
            keywords: []
        }

        this.handleModelButtonClick = this.handleModelButtonClick.bind(this)
    }

    componentDidMount() {
        
        //gets the models from the backend
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                //'Accept': 'application/json' 
            },
        };
        fetch(model_list_url, requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ availableModels: data.models }))
            .catch(console.log);
    }

    handleModelButtonClick(model) {
        this.props.handleChange(model);
        //callback
    }

    removeChip(keyword) {

    }

    addChip(keyword) {

    }

    render() {
        console.log(this.props.selectedModels)
        const models = this.state.availableModels;
        return (
            <div>
                <div className="model-button-wrapper">
                    {models.map((model, i) => (
                        <ModelButton 
                            title={model}
                            key={i}
                            selected={this.props.selectedModels.includes(model)} 
                            handleModelClick={this.handleModelButtonClick}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default ModelController;