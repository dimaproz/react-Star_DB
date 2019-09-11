import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import './item-list.css';
import Spinner from '../spinner';
export default class ItemList extends Component {

  swapiService = new SwapiService();

  state = {
    itemList: null,
  }


  componentDidMount() {
    const {getData} = this.props;
    getData()
      .then(this.onitemListLoaded);
  }
  onitemListLoaded = (itemList) => {
    this.setState({
      itemList,
    });
  }
  renderItems(arr) {
    return arr.map(({ id, name }) => {
      return (
        <li className="list-group-item" key={id} onClick={() => this.props.onItemSelected(id)}>
          {name}
        </li>
      );
    });
  }

  render() {
    const { itemList } = this.state;

    if (!itemList) {
      return <Spinner />;
    }
    const items = this.renderItems(itemList);
    return (
      <ul className="item-list list-group">
        {items}
      </ul>
    );
  }
}