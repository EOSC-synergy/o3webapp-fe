import React from 'react';
import ModelButton from '../buttons/ModelButton/ModelButton'
import configData from '../../config.json'

//get path from Config file
const model_list_url = configData.SERVER_URL + configData.MODEL_LIST_PATH;


/**
 * Controller for the Models
 * @param props.availableModels all available models the user can choose from
 */
class ModelController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            availableModels: [],
            keywords: [],
            searchTerm: '',
        };

        this.handleModelButtonClick = this.handleModelButtonClick.bind(this);
        this.modelSearchOnChange = this.modelSearchOnChange.bind(this);
    }

    componentDidMount() {
        const currplotType = this.props.plotType;
        console.log(currplotType);
        
        const request_url = model_list_url + '/' + currplotType;
        console.log(request_url)
        
        //gets the models from the backend
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                //'Accept': 'application/json' 
            },
        };
        fetch(request_url, requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ availableModels: data.models }))
            .catch(console.log);
    }

    /**
     * Callback for passing the state up
     * @param model the model that changed
     */
    handleModelButtonClick(model) {
        this.props.handleChange(model);
    }

    modelSearchOnChange(event) {
        this.setState({
            searchTerm: event.target.value,
        })
    }

    removeChip(keyword) {

    }

    addChip(keyword) {

    }

    render() {
        //const keywords = this.state.keywords;   //all keywords for chips
        const inputValue = this.state.searchTerm;

        const models = this.state.availableModels;
        const filteredModels = models.filter( (model) => {
            return model.toLowerCase().includes(inputValue.toLowerCase());
        })



        return (
            <div className="model-section-wrapper section-wrapper">
                <p className="section-label">Models</p>
                <div className="search-area-wrapper">
                    <label htmlFor="search">Enter a keyword</label>
                    <input type="text" value={inputValue} onChange={this.modelSearchOnChange}></input>
                </div>

                <div className="model-button-section-wrapper">
                    {filteredModels.map((model, i) => (
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