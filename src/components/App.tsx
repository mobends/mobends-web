import React from 'react';
import './App.scss';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { Loader } from './shared/Loader';
import { Header } from './Header';
import { PacksPage } from './PacksPage';
import { HomePage } from './HomePage';
import { Route } from './router/Route';
import { Router } from './router/Router';
import { useSelector } from 'react-redux';
import { RootState } from '../store/types';

function App() {
  const loading = useSelector((state: RootState) => state.loading);

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="App_content">
          <SimpleBar>
            <Route page="packs" component={<PacksPage />} />
            <Route page={null} component={<HomePage />} />
          </SimpleBar>
        </div>
        { loading ? (<Loader />) : null }
      </div>
    </Router>
  );
}

export default App;
