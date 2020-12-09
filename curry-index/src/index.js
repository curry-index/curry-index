import React, { Component } from "react";
import ReactDOM from 'react-dom';
import './index.css';
import {
    // BrowserRouter as Router,
    Switch,
    Route,
    HashRouter
} from "react-router-dom";
import MapContainer from "./Map";
import Nav from "./Nav";
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';

class Routing extends Component {
    render() {
        return (
                <div className="container">
                    <HashRouter basename='/'>
                        <Nav />

                        {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
                        <Switch>
                            <Route exact path="/">
                                <App />
                            </Route>

                            <Route path="/map">
                                <MapContainer />
                            </Route>
                        </Switch>
                    </HashRouter>
                </div>
        )
    }
}

// const Home = () => <div><h2>Home</h2></div>
// const About = () => <div><h2>About</h2></div>

ReactDOM.render(<Routing />, document.getElementById('root'));