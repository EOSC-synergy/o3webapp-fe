import React from 'react'

import './Dropdown.css'

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
                className="dropdown-header mat-style"
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

export default Dropdown;