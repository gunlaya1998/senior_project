import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import './index.css';
import * as serviceWorker from './serviceWorker';
import LandingPage from './pages/LandingPage/home';
import TopProvincePage from './pages/TopProvince/TopProvince';
import TopPlacesPage from './pages/TopPlaces/TopPlaces';
import searchMap from './pages/SearchResult/searchMap';
import MapsProvince from './pages/Maps/mapsProv';
import MapsPlace from './pages/Maps/mapsPlace';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Switch>                
                <Route exact path="/" component={LandingPage} />
                <Route path="/province" component={TopProvincePage} />
                <Route path="/places" component={TopPlacesPage} />
                <Route path="/topProvince/:rank" component={MapsProvince} />
                <Route path="/topPlace/:rank" component={MapsPlace} />
                <Route path="/searchMap/:searchTerm" component={searchMap} />

            </Switch>
        </Router>
    </React.StrictMode>,
document.getElementById('root')
);

serviceWorker.unregister();