import React from 'react';
import './App.scss';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { Header } from './Header';
import { RoadMapPage } from './pages/RoadMapPage';
import { HomePage } from './pages/HomePage';
import { Route } from './router/Route';
import { Router } from './router/Router';
import { UserDashboardPage } from './pages/userDashboard/UserDashboardPage';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <div className="App__content">
                    <SimpleBar>
                        <Route page="dashboard" component={<UserDashboardPage />} />
                        <Route page="roadmap" component={<RoadMapPage />} />
                        <Route page={null} component={<HomePage />} />
                    </SimpleBar>
                </div>
            </div>
        </Router>
    );
}

export default App;
