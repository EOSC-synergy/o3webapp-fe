import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  //Link,
} from 'react-router-dom';
import Generation from './pages/Generation';
import Manipulation from './pages/Manipulation';
import About from './pages/About';
import Home from './pages/Home/Home.js';
import Navigation from './components/navigation/Navigation';

function App() {
  return (
    <Router>
        <Navigation />
        <Switch>
          <Route path='/generation'>
            <Generation />
          </Route>
          <Route path='/manipulation'>
            <Manipulation />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
