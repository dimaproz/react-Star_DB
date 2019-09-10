import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';

import './person-details.css';

export default class PersonDetails extends Component {
  swapiService = new SwapiService();
  state = {
    personId: null
  }

  componentDidMount() {
    this.updatePersone();
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId != prevProps.personId) {
      this.updatePersone();
    }
  }

  updatePersone() {
    const {personId} = this.props;
    if (!personId) {
      return;
    }
    this.swapiService.getPersone(personId)
      .then((person) => {
        this.setState({person});
      })
  }

  render() {
    if (!this.state.person) {
      return <span>Select person from a list</span>
    }
    const { id, name, gender, birthday, eyeColor} = this.state.person;
    
    return (
      <div className="person-details card">
        <img className="person-image"
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthday}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}