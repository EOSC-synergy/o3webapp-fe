import React from 'react'

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
            <fieldset>
                <legend>Enter {bound} Year!</legend>
                <input
                    value={year}
                    onChange={this.handleChange} />
            </fieldset>
        );
    }
}

export default YearButton;