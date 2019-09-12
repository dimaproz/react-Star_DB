import React from 'react';
import ItemList from './components/item-list';
import PersonDetails from './components/person-details';
import Header from './components/header';
import RandomPlanet from './components/random-planet';
import ErrorIndicator from './components/error-indicator';
import ErrorButton from './components/error-button';
import PeoplePage from './components/people-page';
import SwapiService from './services/swapi-service';
import './App.css';
import ErrorBoundry from './components/error-boundry';


class App extends React.Component {

  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    selectedPersone: null,
  }

  onPersoneSelected = (id) => {
    this.setState({
      selectedPersone: id
    });
  }
  toggleRandomPlanet = () => {
    this.setState({
      showRandomPlanet: !this.state.showRandomPlanet
    });
  }


  render() {
    const { showRandomPlanet, hasError } = this.state;
    const planet = showRandomPlanet ? <RandomPlanet /> : null;
    return (
      <ErrorBoundry>
        <div className="container stardb-app">
          <Header />
          {planet}

          <div className="row mb2 button-row">
            <button
              className="toggle-planet btn btn-warning btn-lg"
              onClick={this.toggleRandomPlanet}>
              Toggle Random Planet
          </button>
            <ErrorButton />
          </div>
          <PeoplePage />
        </div>
      </ErrorBoundry>

    );
  }

};

export default App;