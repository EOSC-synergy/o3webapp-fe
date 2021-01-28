import {Link} from 'react-router-dom'
import './Home.css'

function Home() {
    return (
        <div className='background-picture' style={{ backgroundImage: "url(/background-clouds.jpg)"}}>
            <h1>o3as App</h1>
            <h2>Analyse the ozone layer with customizable plots!</h2>
            <div>
                <Link to='/Generating'>Start generating!</Link>
            </div>
        </div>
    );
}


export default Home;