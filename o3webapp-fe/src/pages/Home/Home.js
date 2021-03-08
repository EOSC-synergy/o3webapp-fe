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
                    <h2>This is some more info</h2>
                    <h3>Analyse the ozone layer with customizable plots! Analyse the ozone layer with customizable plots!</h3>
                </div>
            </div>
        );
    }
}



export default Home;