import {Link} from 'react-router-dom'
import './Home.css'
import StartGeneratingButton from '../../components/buttons/StartGeneratingButton/StartGeneratingButton'

function Home() {
    return (
        <div className='background-picture' style={{ backgroundImage: "url(/background-clouds.jpg)"}}>
            <div className="HomeContainer">
                <h1>o3as App</h1>
                <h2>Analyse the ozone layer with customizable plots!</h2>
                <StartGeneratingButton/>

                {/* 
                <div>
                    <Link to='/Generating'>Start generating!</Link>
                </div>
                */}
            </div>
        </div>
    );
}


export default Home;