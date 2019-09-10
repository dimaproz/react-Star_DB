import React from 'react';

import Header from './components/header';
import RandomPlanet from './components/random-planet';
import ItemList from './components/item-list';
import PersonDetails from './components/person-details';

import './App.css';

class App extends React.Component {

state = {
  showRandomPlanet: true,
  selectedPersone: null
}

onPersoneSelected = (id) => {
  this.setState({
    selectedPersone: id
  });
  console.log(this.state.selectedPersone);
}

toggleRandomPlanet = () => {
  this.setState({
    showRandomPlanet: !this.state.showRandomPlanet
  });
}


  render() {
    const {showRandomPlanet} = this.state;
    const planet = showRandomPlanet ? <RandomPlanet /> : null ;
    return (
      <div className="container">
        <Header />
        {planet}
        <button className="toggle-planet btn btn-warning btn-lg" onClick={this.toggleRandomPlanet}>Toggle Random Planet</button>

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList onItemSelected={this.onPersoneSelected} />
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPersone}/>
          </div>
        </div>
      </div>
    );
  }

};

export default App;