import React from 'react';
import YearButton from '../buttons/YearButton'

const plotTypes = {
    one: 'plot1',
    two: 'plot2',
    three: 'someShit!',
};

class GenerationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //plotType: 'plot1',
            // models: [],
            years: [1970, 2100],
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        //this.handleInputChange = this.handleInputChange.bind(this);


        this.handleLowerYearChange = this.handleLowerYearChange.bind(this);
        this.handleUpperYearChange = this.handleUpperYearChange.bind(this);
    }

    /**
     * 
     * @param {*} year 
     */
    handleLowerYearChange(year) {
        const oldState = this.state.years;
        this.setState({
            years: [year, oldState[1]]
        })
    }

    handleUpperYearChange(year) {
        const oldState = this.state.years;
        this.setState({
            years: [oldState[0], year]
        })
    }
    
    handleSubmit(event) {
        alert('this was submitted: ' + this.state.years[0] + " and this: " + this.state.years[1]);
        event.preventDefault();
    }

    // handleInputChange(event) {
    //     const target = event.target;
    //     const value = target.type === 'plotSelector' ? target.plot : target.models;
    //     const name = target.name;

    //     this.setState({
    //         [name]: value
    //     })
    //     this.setState({
    //         plotType: event.taget.value
    //     })
    // }

    render() {
        const years = this.state.years

        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <YearButton 
                    year={years[0]}
                    bound="lower"
                    handleYearChange={this.handleLowerYearChange} />
                    <YearButton
                    year={years[1]}
                    bound="upper"
                    handleYearChange={this.handleUpperYearChange} />
                </div>
                <br />

                
                <label>
                    Select the models:
                    <input 
                        name='models'
                        type='modelsSelector'
                        models={this.state.models}
                        onChange={this.handleInputChange}
                    />
                </label> 
                <br />
                <input type='submit' value="Submit" />
            </form>
        )
    }
}

export default GenerationForm;