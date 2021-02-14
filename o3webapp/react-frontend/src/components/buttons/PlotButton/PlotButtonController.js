import React from 'react';
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md'

import './PlotButtonController.css'

class PlotButtonController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            plotTypes: [
                {
                    id: 0,
                    type: "tco3_zm",
                    selected: true,
                    key: "plotTypes",
                },
                {
                    id: 1,
                    type: "tco3_return",
                    selected: false,
                    key: "plotTypes",
                },
                {
                    id: 2,
                    type: "vmro3_zm",
                    selected: false,
                    key: "plotTypes",
                }
            ]
        };
    
        this.resetThenSet = this.resetThenSet.bind(this);
    }

    /**
     * callback function that updates the state here
     * @param {number} id 
     * @param {string} key 
     */
    resetThenSet(id, key) {
        const temp = [...this.state[key]];
        
        temp.forEach((item) => item.selected = false);
        temp[id].selected = true;

        this.setState({
            [key]: temp,
        })

        const type = this.state[key][id].type;

        //update form
        this.props.handleChange(type);
    }
  

    render() {
        return (
                <Radio 
                    title="Select a plot"
                    list={this.state.plotTypes}
                    resetThenSet={this.resetThenSet} />
        );
    }
}

export default PlotButtonController;

class Radio extends React.Component {
    constructor(props) {
        super(props);
        this.selectItem = this.selectItem.bind(this);
    }


    /**
     * Set the
     * @param item as active when clicked 
     */
    selectItem(item) {
        const { resetThenSet } = this.props;
        const { id, key } = item;
        resetThenSet(id, key);
    }

    render() {
        const { list } = this.props;
        return(
            <div className="plot-selection-wrapper">
                <p className="section-label">Plot type</p>
                <div role="list" className="radio-list">
                    {list.map((item) => (
                        <button
                            type="button"
                            className="radio-list-item"
                            key={item.id}
                            onClick={() => this.selectItem(item)}
                        >
                            <div className="radio-icon-wrapper">
                                {item.selected ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />}
                            </div>
                            <p className="radio-item-label">
                                {item.type}
                            </p>
                        </button>
                    ))}
                </div>
            </div>
        );
    }
}


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