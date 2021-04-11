import React from 'react';
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md';
import PropTypes from 'prop-types';

import * as configData from '../../../config.json';
import './PlotButtonController.css'

class PlotButtonController extends React.Component {
    constructor(props) {
        super(props);
        let active = this.props.active;
        let plotTypes = configData.PLOT_DEFAULT_AVAILABLE
        plotTypes.forEach(plotType => {
            if (plotType.type === active) {
                plotType.selected = true;
            } else {
                plotType.selected = false;
            }
        })
        console.log(plotTypes, active);
        this.state = {
            plotTypes
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

PlotButtonController.propTypes = {
    handleChange: PropTypes.func.isRequired,
    active: PropTypes.string.isRequired
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
            <div className="plot-selection-wrapper section-wrapper">
                <p className="section-label">Plot type</p>
                <div role="list" className="radio-list">
                    {list.map((item) => (
                        <button
                            type="button"
                            className="radio-list-item mat-style"
                            key={item.id}
                            onClick={() => this.selectItem(item)}
                        >
                            <div className="radio-icon-wrapper">
                                {item.selected ? <MdRadioButtonChecked color="#fed136" size="20px"/> : <MdRadioButtonUnchecked size="20px"/>}
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

Radio.propTypes = {
    resetThenSet: PropTypes.func.isRequired,
    list: PropTypes.arrayOf(PropTypes.object).isRequired
}