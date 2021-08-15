import React from 'react';
import './App.scss';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { Header } from './Header';
import { EditorPage } from './EditorPage';
import { HomePage } from './HomePage';
import { Route } from './router/Route';
import { Router } from './router/Router';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <div className="App__content">
                    <SimpleBar>
                        <Route page="editor" component={<EditorPage />} />
                        <Route page={null} component={<HomePage />} />
                    </SimpleBar>
                </div>
            </div>
        </Router>
    );
}

export default App;
