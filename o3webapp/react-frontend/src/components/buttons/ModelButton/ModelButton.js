import React from 'react'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'
import './ModelButton.css'

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
            <button className="model-button mat-style" onClick={this.handleModelClick} type="button">
                <div className="radio-icon-wrapper">
                    {selected ? <MdCheckBox color="#fed136" size="20px"/> : <MdCheckBoxOutlineBlank size="20px"/>}
                </div>
                <p className="model-button-label">
                    {title}
                </p>
                <div className="more-info-button" data-md-tooltip="More Info">
                    {selected ? <IoMdArrowDropup size="23px"/> : <IoMdArrowDropdown size="23px"/>}
                </div>
            </button>
                
        )
    }
}

export default ModelButton;