import React, { Component } from 'react';

import Header from './components/header';
import RandomPlanet from './components/random-planet';
import ErrorBoundry from './components/error-boundry';
import SwapiService from './services/swapi-service';
import DummySwapiService from './services/dummy-swapi-service';

import { PeoplePage, PlanetsPage, StarshipsPage } from './components/pages';
import { SwapiServiceProvider } from './components/swapi-service-context';

import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

export default class App extends Component {

  state = {
    swapiService: new SwapiService()
  };

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service = swapiService instanceof SwapiService ?
                        DummySwapiService : SwapiService;
      return {
        swapiService: new Service()
      };
    });
  };

  render() {

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService} >
          <Router>
            <div className="stardb-app">
              <Header onServiceChange={this.onServiceChange} />
              <RandomPlanet />

              <Route path="/people" component={PeoplePage} />
              <Route path="/planets" component={PlanetsPage} />
              <Route path="/starships" component={StarshipsPage} />

            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
