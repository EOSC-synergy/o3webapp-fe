import React from 'react'
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md'

class ModelButton extends React.Component {
    constructor(props) {
        super(props)

        this.handleModelClick = this.handleModelClick.bind(this)
    }



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