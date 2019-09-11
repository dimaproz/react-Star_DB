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


class App extends React.Component {

  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    selectedPersone: null,
    hasError: false
  }

  onPersoneSelected = (id) => {
    this.setState({
      selectedPersone: id
    });
  }
  componentDidCatch() {
    this.setState({
      hasError: true
    })
  }
  toggleRandomPlanet = () => {
    this.setState({
      showRandomPlanet: !this.state.showRandomPlanet
    });
  }


  render() {
    const { showRandomPlanet, hasError } = this.state;
    const planet = showRandomPlanet ? <RandomPlanet /> : null;
    if (hasError) {
      return <ErrorIndicator />;
    }
    return (
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

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList onItemSelected={this.onPersonSelected} 
            getData={this.swapiService.getAllPlanets}/>
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPerson} />
          </div>
        </div>

      </div>
    );
  }

};

export default App;