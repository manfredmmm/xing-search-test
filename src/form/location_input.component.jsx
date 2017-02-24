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
      showLocationList: false
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

  _cleanLocations(event) {
    if (event.keyCode === 27) {
      this.setState({ value: '' });
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
          onChange={event => this._findLocations(event)}
          onKeyDown={event => this._cleanLocations(event)}
          ref={(c) => { this.location = c; }}
        />
        <LocationListComponent
          list={this.state.locationsList}
          changeLocation={value => this._selectLocation(value)}
          show={this.state.showLocationList}
        />
      </div>
    );
  }
}

LocationInputComponent.propTypes = {
  saveLocation: PropTypes.func.isRequired
};

export default LocationInputComponent;
