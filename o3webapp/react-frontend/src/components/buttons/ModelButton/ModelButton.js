import React from 'react'
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md'

/**
 * Button for selecting a model. Allow the user to select the model
 */
class ModelButton extends React.Component {
    constructor(props) {
        super(props)

        this.handleModelClick = this.handleModelClick.bind(this)
    }


    /**
     * updates the state by passing it to the callback of the parent element
     */
    handleModelClick() {
        this.props.handleModelClick(this.props.title)
    }


    render() {
        const title = this.props.title;
        const selected = this.props.selected;

        return (
            <button className="model-button" onClick={this.handleModelClick} type="button">
                <div className="radio-icon-wrapper">
                    {selected ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />}
                </div>
                {title}
            </button>
                
        )
    }
}

export default ModelButton;