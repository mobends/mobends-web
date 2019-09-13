import React from 'react';
import './App.scss';

import { Header } from './Header';
import { PacksPage } from './PacksPage';
import { Route } from './router/Route';
import { Router } from './router/Router';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="App_content">
          <Route page="packs" component={<PacksPage />} />
        </div>
      </div>
    </Router>
  );
}

export default App;
