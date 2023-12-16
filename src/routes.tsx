import React from 'react';
import { Router, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import ReactGA from 'react-ga';
import history from './history';
import { RecentsService } from './Services/recentsService';
import BookList from './Pages/BookList';
import PersonList from './Pages/PersonList';
import RegistryList from './Pages/RegistryList';

history.listen((location, action) => {
    try {
        let instanceService = new RecentsService();
        instanceService.updateRecents(location);
        ReactGA.pageview(location.pathname + location.search);
    }
    catch (e) { }
})

const AppRoutes: React.FC = (props) => {

    return (
        <Router history={history}>
            <div>
                <Route component={Home} path="/" exact />
                <Route component={BookList} path="/Books" exact />
                <Route component={PersonList} path="/Persons" exact />
                <Route component={RegistryList} path="/Registry" exact />
            </div>
        </Router>
    );
};

export default AppRoutes;