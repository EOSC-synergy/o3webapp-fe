import React from 'react';
import Axios from 'axios';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import PropTypes from 'prop-types';
import * as URL_Utility from '../../../utility/Url_from_env';
import * as configData from '../../../config.json';

import './ModelButton.css';



/**
 * Button for selecting a model. Allow the user to select the model
 */
class ModelButton extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            opened: false,
            className: "model-button mat-style",
            info_display: "Loading...",
            hasBeenOpenedBefore: false
        }

        this.handleModelClick = this.handleModelClick.bind(this)
        this.handleMoreInfoClick = this.handleMoreInfoClick.bind(this)
    }


    /**
     * updates the state by passing it to the callback of the parent element
     */
     handleModelClick() {
        this.props.handleModelClick(this.props.title)
    }

    /**
     * updates the state by passing it to the callback of the parent element
     */
    async handleMoreInfoClick() {
        this.toggleOpenedState();

        //quit early if info has already been fetched
        var { hasBeenOpenedBefore } = this.state
        if (hasBeenOpenedBefore) {
            return;
        }

        //get the info from the api
        const info_object = await this.fetchModelInfoFromApi();
        var info_display = "";
        if (info_object === null || info_object === undefined || info_object.info === undefined ) {
            console.log("Couldn't fetch info from the api");
            info_display = "No info available";
        } else {
            info_display = info_object.info;
        }
        this.setState({
            info_display,
            hasBeenOpenedBefore: true
        })
    }


    /**
     * Fetches the model info from the backend api
     * @returns the model info object from the api
     */
    async fetchModelInfoFromApi() {
        const modelName = this.props.title;

        const BACKEND_SERVER_URL = URL_Utility.getApiUrlFromEnv();

        //TODO forward via our own api
        const request_url = BACKEND_SERVER_URL + configData.MODEL_INFO_PATH + '/' + modelName;

        //gets the models from the backend
        const requestOptions = {
            headers: {
                'Accept': 'application/json',
            },
            timeout: 5000
        };

        // const requestBody = {
        //     pType: currplotType
        // };
        try {
            let response = await Axios.get(request_url, requestOptions)
            let output = response.data;
            return output;
        } catch (error) {
            console.error(error.message);
            return null;
        }
        
            //.then(response => console.log(response.data))    
            // .then(response => output = response.data)
            // .catch(error => console.error(error));
        
    }


    toggleOpenedState() {
        const opened = !this.state.opened;
        const className = opened ? "model-button-opened mat-style" : "model-button mat-style";
        this.setState({
            opened,
            className
        });
    }



    render() {
        const title = this.props.title;
        const selected = this.props.selected;
        const opened = this.state.opened;
        const classname = this.state.className;
        const { info_display } = this.state

        return (
            <button className={classname}  type="button">
                <div className="model-button-title-wrapper">
                    <span onClick={this.handleModelClick}>
                        <div className="radio-icon-wrapper">
                            {selected ? <MdCheckBox color="#fed136" size="20px"/> : <MdCheckBoxOutlineBlank size="20px"/>}
                        </div>
                        <p className="model-button-label">
                            {title}
                        </p>
                    </span>
                    <div className="more-info-button" data-md-tooltip-model-button="More Info" onClick={this.handleMoreInfoClick}>
                        {opened ? <IoMdArrowDropup size="23px"/> : <IoMdArrowDropdown size="23px"/>}
                    </div>
                </div>
                {opened ?
                <div className="model-button-moreInfo">
                    <p>{info_display}</p>
                </div>
                :
                <div></div>}
            </button>
                
        )
    }
}

ModelButton.propTypes = {
    handleModelClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired
}

export default ModelButton;