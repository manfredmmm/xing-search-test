import React, { Component, PropTypes } from 'react';

import styles from './location_list.css';

class LocationListComponent extends Component {
  _selectLocation(event) {
    event.preventDefault();
    this.props.changeLocation(event.target.value);
  }

  _locationItem() {
    return (
      this.props.list.map((location, index) =>
        <li key={index} className={index === this.props.currentLocation ? styles.selectedLocation : styles.location}>
          <label htmlFor={`location-${index}`} className={styles.label}>
            <input
              id={`location-${index}`}
              type="checkbox"
              value={location}
              className={styles.checkbox}
              onChange={event => this._selectLocation(event)}
            />
            {location}
          </label>
        </li>
      )
    );
  }

  render() {
    if (this.props.show) {
      if (this.props.list.length > 0) {
        return (
          <div className={styles.list}>
            <ul>{this._locationItem()}</ul>
          </div>
        );
      }
      return (
        <div className={styles.list}>
          <ul>
            <li className={styles.selectedLocation}>
              <span className={styles.label}>No results</span>
            </li>
          </ul>
        </div>
      );
    }
    return null;
  }
}

LocationListComponent.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  changeLocation: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  currentLocation: PropTypes.number.isRequired
};

export default LocationListComponent;
