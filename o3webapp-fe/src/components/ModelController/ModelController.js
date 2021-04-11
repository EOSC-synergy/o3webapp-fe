import React from 'react';
import PropTypes from 'prop-types';

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
        this.handleSelectAll = this.handleSelectAll.bind(this);
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
     * Handles selecting all models
     */
     handleSelectAll() {
        //TODO
        var currentKeywords = this.state.searchTerm;
        const models = this.props.availableModels;
        const filteredModels = models.filter( (model) => {
            return model.toLowerCase().includes(currentKeywords.toLowerCase());
        })
        this.props.selectAll(filteredModels);
    }

    handleDeselectAll = () => {
        this.props.deselectAll();
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
                <div className="select-container">
                    <div className="select-all-button mat-style" onClick={this.handleSelectAll}>Select All</div>
                    <div className="deselect-all-button mat-style" onClick={this.handleDeselectAll}>Deselect All</div>
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

ModelController.propTypes = {
    handleChange: PropTypes.func.isRequired,
    availableModels: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    selectAll: PropTypes.func.isRequired,
    deselectAll: PropTypes.func.isRequired,
    selectedModels: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
}

export default ModelController;