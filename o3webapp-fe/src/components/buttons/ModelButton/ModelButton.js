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

        this.state = {
            opened: false,
            className: "model-button mat-style"
        }

        this.handleModelClick = this.handleModelClick.bind(this)
        this.handleMoreInfoClick = this.handleMoreInfoClick.bind(this)
    }


    /**
     * updates the state by passing it to the callback of the parent element
     */
    handleModelClick() {
        this.props.handleModelClick(this.props.title)
    }

    /**
     * updates the state by passing it to the callback of the parent element
     */
    handleMoreInfoClick() {
        let opened = !this.state.opened
        if(opened) {
            this.setState({className: "model-button-opened mat-style"})
            console.log(this.state.className)
        } else {
            this.setState({className: "model-button mat-style"})
        }

        this.setState({opened: opened})
    }



    render() {
        const title = this.props.title;
        const selected = this.props.selected;
        const opened = this.state.opened;
        const classname = this.state.className;

        return (
            <button className={classname}  type="button">
                <div className="model-button-title-wrapper">
                    <span onClick={this.handleModelClick}>
                        <div className="radio-icon-wrapper">
                            {selected ? <MdCheckBox color="#fed136" size="20px"/> : <MdCheckBoxOutlineBlank size="20px"/>}
                        </div>
                        <p className="model-button-label">
                            {title}
                        </p>
                    </span>
                    <div className="more-info-button" data-md-tooltip-model-button="More Info" onClick={this.handleMoreInfoClick}>
                        {opened ? <IoMdArrowDropup size="23px"/> : <IoMdArrowDropdown size="23px"/>}
                    </div>
                </div>
                {opened ?
                <div className="model-button-moreInfo">
                    <p>This is some text</p>
                </div>
                :
                <div></div>}
            </button>
                
        )
    }
}

export default ModelButton;