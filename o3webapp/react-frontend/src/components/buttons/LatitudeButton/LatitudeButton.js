import React from 'react';
import './LatitudeButton.css'

/**
 * Represents the latitude selection
 */
class LatitudeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: [
                {
                    id: 0,
                    title: "SH polar",
                    value: [-90, -60],
                    selected: false,
                    key: "latitude",
                },
                {
                    id: 1,
                    title: "SH mid-latitudes",
                    value: [-60, -35],
                    selected: false,
                    key: "latitude",
                },
                {
                    id: 2,
                    title: "tropics",
                    value: [-20, 20],
                    selected: false,
                    key: "latitude",
                },
                {
                    id: 3,
                    title: "NH mid-latitudes",
                    value: [35, 60],
                    selected: false,
                    key: "latitude",
                },
                {
                    id: 4,
                    title: "NH polar",
                    value: [60, 90],
                    selected: false,
                    key: "latitude",
                },
                {
                    id: 5,
                    title: "near global",
                    value: [-60, 60],
                    selected: false,
                    key: "latitude",
                },
                {
                    id: 6,
                    title: "global",
                    value: [-90, 90],
                    selected: false,
                    key: "latitude",
                },
                {
                    id: 7,
                    title: "Custom",
                    value: [],
                    selected: false,
                    key: "latitude",
                },
            ],
        };
        this.resetThenSet = this.resetThenSet.bind(this);
        this.handleCustomMonths = this.handleCustomMonths.bind(this);
    }

    /**
     * updates the state
     * @param {number} id - id of the selected field 
     * @param {string} key - key of the list
     */
    resetThenSet(id, key) {
        const temp = [...this.state[key]];
        
        temp.forEach((item) => item.selected = false);
        temp[id].selected = true;

        this.setState({
            [key]: temp,
        })

        const value = this.state[key][id].value;

        //update form
        this.props.handleChange(value);
    }

    /**
     * handles input in the custom field
     * @param event 
     */
    handleCustomMonths(event) {

        const inputString = event.target.value;

        //remove leading/trailing commas and whitespaces
        var str = inputString.replace(/(^[,\s]+)|([,\s]+$)/g, '');

        //convert to number array
        const inputNumber = str.split(',').map(function(item) {
            return parseInt(item, 10);
        });

        //TODO check if entered values are in allowed range (-90 to 90)

        //TODO check if exactly two numbers have been entered

        //check if array only includes numbers
        if (inputNumber.includes(NaN)) {
            //TODO implement some error notification
            //rn it just doesnt update the value
            console.log("Some NaN found")

        } else {
            //! Magic String
            const key = "latitude"
            const temp = [...this.state[key]]

            //! Magic Number
            temp[7].value = inputNumber;
            
            this.setState({
                [key]: temp
            })

            //! Magic Number
            this.resetThenSet(7, key)
        }
    }

    render() {
        const customSelected = this.state.latitude[7].selected;

        return (
            <div className="latitude-button-wrapper">
                <p className="section-label">Latitude Band</p>
                <Dropdown 
                title="Select a Latitude Band!"
                list={this.state.latitude}
                resetThenSet={this.resetThenSet} />
                {customSelected && (
                    <div className="custom-input-wrapper">
                        <fieldset>
                            <legend>Enter Latitude!</legend>
                            <input
                                placeholder="-90, 0"
                                onChange={this.handleCustomMonths} />
                        </fieldset>
                    </div>
                )}
            </div>
        );
    }

}

class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpened: false,
            headerTitle: this.props.title, 
        }

        this.toggleList = this.toggleList.bind(this);
        this.selectItem = this.selectItem.bind(this);
    }

    /**
     * updates the isOpened state of the list
     */
    toggleList() {
        const oldState = this.state.isOpened;
        this.setState({
            isOpened: !oldState,
        })
    }

    /**
     * Set the
     * @param item as active when clicked 
     */
    selectItem(item) {
        const { resetThenSet } = this.props;
        const { title, id, key } = item;

        this.setState({
            headerTitle: title,
            isOpened: false,
        }, () => resetThenSet(id, key));
    }


    render() {
        const { isOpened, headerTitle } = this.state;
        const { list } = this.props;
        return(
            <div className="dropdown-wrapper">
                <button
                type="button"
                className="dropdown-header"
                onClick={this.toggleList}
                >
                    <div className="dropdown-header-title">
                        {headerTitle}
                    </div>
                </button>
                {isOpened && (
                    <div role="list" className="dropdown-list">
                        {list.map((item) => (
                            <button
                                type="button"
                                className="dropdown-list-item"
                                key={item.id}
                                onClick={() => this.selectItem(item)}
                            >
                                {item.title}
                                {' '}
                            </button>
                        ))}
                    </div>
                )}

            </div>
        );
    }
}

export default LatitudeButton;