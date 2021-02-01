import React from 'react';

class PlotButtonController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isToggledOn: true};
    
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState( state => ({
          isToggledOn: !state.isToggledOn
        }));
      }

    render() {
        return (
            <button>
                {this.props.name}
            </button>
        );
    }
}

export default PlotButtonController;

/*  
code for a basic radio button, no styling of any kind


<label>
                    <input 
                        name='plotType'
                        type='radio'
                        value="plot1"
                        checked={this.state.plotType === "plot1" }
                        onChange={this.handleInputChange}
                    />
                    {plotTypes["one"]}
                </label>
                <br />
                <label>
                    <input 
                        name='plotType'
                        type='radio'
                        value="plot2"
                        checked={this.state.plotType === "plot2" }
                        onChange={this.handleInputChange}
                    />
                    {plotTypes["two"]}
                </label>
                <br />
                <label>
                    <input 
                        name='plotType'
                        type='radio'
                        value="plot3"
                        checked={this.state.plotType === "plot3" }
                        onChange={this.handleInputChange}
                    />
                    {plotTypes["three"]}
                </label>
                */