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
            keywords: [],
            searchTerm: '',
        };

        this.handleModelButtonClick = this.handleModelButtonClick.bind(this);
        this.modelSearchOnChange = this.modelSearchOnChange.bind(this);
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
        console.log(filteredModels)



        return (
            <div>
                <div className="seach-area-wrapper">
                    <label htmlFor="search">Enter for keywords</label>
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