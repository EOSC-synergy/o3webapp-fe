/*
TODO implement button

have 2 states, 
one for the chosen months, eg [1,2,3] for the first three months of the year
    this state gets managed by the form, cause its the single source of truth for this

second one for the currently choosen card/setting.
    available settings are: Spring, Summer, Autumn, Winter and Custom
    when the user selects custom an input field appears where he can enter custom numbers.
        this can be controller by checking with an if clause if the current state is custom and only then show this.

    when the user selects anything else the months corresponding to these settings get selected (eg [1,2,3] for Spring)



*/

import React from 'react';

class MonthsButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            season: [
                {
                    id: 0,
                    title: "Spring",
                    selected: false,
                    key: "season",
                },
                {
                    id: 1,
                    title: "Summer",
                    selected: false,
                    key: "season",
                },
                {
                    id: 2,
                    title: "Autumn",
                    selected: false,
                    key: "season",
                },
                {
                    id: 3,
                    title: "Winter",
                    selected: false,
                    key: "season",
                },
                {
                    id: 4,
                    title: "Custom",
                    selected: false,
                    key: "season",
                },
            ],
        };
        this.handleChange = this.handleChange.bind(this);
        this.resetThenSet = this.resetThenSet.bind(this);
    }

    /**
     * callback function that updates the parent state
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
    }

    /**
     * calls the parents function to update its state
     * @param event 
     */
    handleChange(event) {
        this.props.handleChange(event.target.value);
    }

    render() {
        return (
            <Dropdown 
            title="Select a season!"
            list={this.state.season}
            resetThenSet={this.resetThenSet} />
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

    toggleList() {
        const oldState = this.state.isOpened;
        this.setState({
            isOpened: !oldState,
        })
    }

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

export default MonthsButton;