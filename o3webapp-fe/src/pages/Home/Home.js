import React from 'react';
import './Home.css'
import StartGeneratingButton from '../../components/buttons/StartGeneratingButton/StartGeneratingButton'
import { RiArrowDropDownLine } from 'react-icons/ri'

class Home extends React.Component {

    render() {
        return (
            <div className="HomePageContainer">
                <div className="FirstPageHome">
                    <div className='background-picture' style={{ backgroundImage: "url(/background-clouds.jpg)"}}>
                        <div className="SplashScreen">
                            <h1>o3as WebApp</h1>
                            <h2>Analyse the ozone layer with customizable plots!</h2>
                            <StartGeneratingButton/>
                        </div>
                        
                        <a className="scrollButton" href="#moreInfoSection">
                            <RiArrowDropDownLine size="80px"/>
                        </a>
                    </div>
                </div>
                <div className="moreInfoSection" id="moreInfoSection">
                    <h2>More Information</h2>
                    <h3>
                        Stratospheric ozone protects life on Earth from harmful UV-radiation. 
                        This protective ozone layer is at about 20 km in the atmospheric layer called stratosphere. 
                        Life and weather happen in the layer below, the troposphere. <br></br>
                        <br></br>
                        The discovery of the ozone hole called for an immediate reaction to halt the destruction of ozone which was initiated by the Montreal protocol (1989) 
                        which controlled the use of ozone depleting substances (ODS) especially  halogenated hydrocarbons.
                        The Montreal Protocol was ratified by all United Nations members. 
                        Subsequent protocols reinforced the Montreal protocol to include more ODSs.<br></br>
                        <br></br>
                        Since then monitoring of stratospheric ozone takes place in approximately four yearly assessments reports. 
                        Recovery of the ozone layer is slow, therefore the future amount of stratospheric ozone is being modeled 
                        using a variety of global climate models with different climate change scenarios. 
                        Models show generally a future amelioration of the amount of ozone in the stratosphere.<br></br>
                        <br></br>
                        The <b>Ozone assessment service (O3as)</b> is developed within the <b>European Open Science Cloud (EOSC)-Synergy</b> project.
                        The tool (O3WebApp) aims to analyze available ozone data from climate models and reanalysis data, 
                        calculate return dates for the recovery of the ozone layer and trends of the amount of ozone in the atmosphere 
                        to produce results in the form of figures in publication quality.
                    </h3>
                </div>
            </div>
        );
    }
}



export default Home;