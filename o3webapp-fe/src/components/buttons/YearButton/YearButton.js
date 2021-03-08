import React from 'react'
import PropTypes from 'prop-types'
import './YearButton.css'

class YearButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.handleYearChange(event.target.value);
    }


    render () {
        const year = this.props.year;
        const bound = this.props.bound;
        return (
            <div className="year-button-wrapper">
                <fieldset>
                    <legend>Enter {bound} Year!</legend>
                    <input
                        value={year}
                        onChange={this.handleChange} />
                </fieldset>
            </div>
        );
    }
}
YearButton.propTypes = {
    handleYearChange: PropTypes.func.isRequired,
    year: PropTypes.number.isRequired,
    bound: PropTypes.string.isRequired
}

export default YearButton;