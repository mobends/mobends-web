/* Styles */
import './App.scss';

import React from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { Header } from './Header';
import { RoadMapPage } from './pages/RoadMapPage';
import { HomePage } from './pages/HomePage';
import { UserDashboardPage } from './pages/userDashboard/UserDashboardPage';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';
import { AdminDashboardPage } from './pages/adminDashboard/AdminDashboardPage';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <div className="App__content">
                    <SimpleBar>
                        <Switch>
                            <Route exact path="/admin">{() => <AdminDashboardPage />}</Route>
                            <Route exact path="/dashboard">{() => <UserDashboardPage />}</Route>
                            <Route exact path="/roadmap">{() => <RoadMapPage />}</Route>
                            <Route exact path="/">{() => <HomePage />}</Route>
                        </Switch>
                    </SimpleBar>
                </div>
            </div>
        </Router>
    );
}

export default App;
