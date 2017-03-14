import React, { Component, PropTypes } from 'react';
import jsonp from 'jsonp';

import LocationListComponent from './location_list.component';

import styles from './location_input.css';

const API_URL = 'http://gd.geobytes.com/AutoCompleteCity?filter=DE';
const THROTTLING_TIME = 300;
const MIN_CHARS_SEARCH = 3;

class LocationInputComponent extends Component {
  constructor() {
    super();
    this.timeOutId = null;
    this.state = {
      value: '',
      locationsList: [],
      showLocationList: false,
      currentLocation: -1
    };
  }

  _fetchLocations(value) {
    if (this.timeOutId) {
      clearTimeout(this.timeOutId);
    }
    this.timeOutId = setTimeout(() => {
      jsonp(`${API_URL}&q=${value}`, (err, data) => {
        if (data[0] === '') {
          this.setState({
            locationsList: [],
            showLocationList: true
          });
        } else {
          this.setState({
            locationsList: data,
            showLocationList: true
          });
        }
      });
    }, THROTTLING_TIME);
  }

  _findLocations(event) {
    const newValue = event.target.value;
    this.setState({
      value: newValue,
      showLocationList: newValue.length >= MIN_CHARS_SEARCH
    });

    if (newValue.length >= MIN_CHARS_SEARCH) {
      this._fetchLocations(newValue);
    }
  }

  _selectLocation(value) {
    this.setState({
      value,
      showLocationList: false
    });
    this.props.saveLocation(value);
    this.location.focus();
  }

  _previousLocation() {
    let previousIdx = this.state.currentLocation - 1;
    if (previousIdx < 0) {
      previousIdx = this.state.locationsList.length - 1;
    }
    return previousIdx;
  }

  _cleanLocations(event) {
    switch (event.keyCode) {
      case 27:
        this.setState({ value: '' });
        break;
      case 40:
        this.setState({
          currentLocation: (this.state.currentLocation + 1) % this.state.locationsList.length
        });
        break;
      case 38:
        this.setState({ currentLocation: this._previousLocation() });
        break;
      case 13:
        this._selectLocation(this.state.locationsList[this.state.currentLocation]);
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div className={styles.locationInput}>
        <input
          type="text"
          placeholder="Location"
          className={styles.input}
          value={this.state.value}
          onFocus={() => this.props.toggleCategories(false)}
          onChange={event => this._findLocations(event)}
          onKeyDown={event => this._cleanLocations(event)}
          ref={(c) => { this.location = c; }}
          onKeyPress={event => this._cleanLocations(event)}
        />
        <LocationListComponent
          list={this.state.locationsList}
          changeLocation={value => this._selectLocation(value)}
          show={this.state.showLocationList}
          currentLocation={this.state.currentLocation}
        />
      </div>
    );
  }
}

LocationInputComponent.propTypes = {
  saveLocation: PropTypes.func.isRequired,
  toggleCategories: PropTypes.func.isRequired
};

export default LocationInputComponent;
