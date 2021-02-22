import React from 'react';
import ModelButton from '../buttons/ModelButton/ModelButton'
import './ModelController.css'


/**
 * Controller for the Models
 * @param props.availableModels all available models the user can choose from
 */
class ModelController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keywords: [],
            searchTerm: '',
        };

        this.handleModelButtonClick = this.handleModelButtonClick.bind(this);
        this.modelSearchOnChange = this.modelSearchOnChange.bind(this);
    }

    /**
     * Callback for passing the state up
     * @param model the model that changed
     */
    handleModelButtonClick(model) {
        this.props.handleChange(model);
    }

    /**
     * Update searchTerm on user input
     * @param event - target that fired the event 
     */
    modelSearchOnChange(event) {
        this.setState({
            searchTerm: event.target.value,
        })
    }

    /**
     * Renders the ModelController
     */
    render() {
        //const keywords = this.state.keywords;   //all keywords for chips
        const inputValue = this.state.searchTerm;

        const models = this.props.availableModels;
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