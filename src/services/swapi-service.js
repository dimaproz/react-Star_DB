export default class SwapiService {
  _apiBase = 'https://swapi.co/api'
  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` + `, received ${res.status}`)
    }
    return await res.json();
  }

  async getAllPeople() {
    const res = await this.getResource(`/people/`);
    return res.results.map(this._transformPersone);
  }
  async getPersone(id) {
    const persone = await this.getResource(`/people/${id}/`);
    return this._transformPersone(persone);
  }
  async getAllPlanets() {
    const res = await this.getResource(`/planets/`);
    return res.results.map(this._transformPlanet);
  }
  async getPlanet(id) {
    const planet = await this.getResource(`/planets/${id}/`);
    return this._transformPlanet(planet);
  }
  async getAllStarships() {
    const res = await this.getResource(`/starships/`);
    return res.results.map(this._transformPlanet);
  }
  async getStarship(id) {
    const starship = this.getResource(`/starships/${id}/`);
    return this._transformStarship(starship);
  }

  _extractId (item) {
    const idRegExsp = /\/([0-9]*)\/$/;
    return item.url.match(idRegExsp)[1];
  }

  _transformPlanet = (planet) => {
    return {
          id: this._extractId(planet),
          name: planet.name,
          population: planet.population,
          rotationPeriod: planet.rotation_period,
          diameter: planet.diameter
        }
  }
  _transformStarship = (starship) => {
    return {
          id: this._extractId(starship),
          name: starship.name,
          model: starship.model,
          manufacturer: starship.manufacturer,
          costInCredits: starship.costInCredits,
          length: starship.length,
          crew: starship.crew,
          passengers: starship.passengers,
          cargoCapacity: starship.cargoCapacity
        }
  }
  _transformPersone = (persone) => {
    return {
          id: this._extractId(persone),
          name: persone.name,
          gender: persone.gender,
          birthday: persone.gender,
          eyeColor: persone.eyeColor  
        }
  }
}

// const swapi = new SwapiService();
// swapi.getPersone(3)
//   .then((p) => { 
//       console.log(p.name)
//   })

