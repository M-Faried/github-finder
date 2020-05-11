import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './components/pages/Home';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';

import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import User from './components/users/User';

import { GithubContextProvider } from './context/GithubContext';
import { AlertContextProvider } from './context/AlertContext';

import './App.css';

const App = () => {
  const siteName = process.env.REACT_APP_WEBSITE_NAME;

  return (
    <GithubContextProvider>
      <AlertContextProvider>
        <Router>
          <div className='App'>
            <Navbar />
            <div className='container'>
              <Alert />
              <Switch>
                <Route path={`/${siteName}/about`} component={About} />
                <Route path={`/${siteName}/user/:login`} component={User} />
                <Route exact path={`/${siteName}/`} component={Home} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertContextProvider>
    </GithubContextProvider>
  );
};

export default App;
