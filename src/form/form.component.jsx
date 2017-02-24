import React, { Component } from 'react';

import SelectComponent from './select.component';
import LocationInputComponent from './location_input.component';

import styles from './form.css';

class FormComponent extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      categories: '',
      location: '',
      showResult: false
    };
  }

  _saveSearch(value) {
    this.setState({ search: value });
  }

  _saveCategory(value) {
    this.setState({ categories: value });
  }

  _saveLocation(value) {
    this.setState({ location: value });
  }

  _sendForm(event) {
    this.setState({ showResult: true });
    event.preventDefault();
  }

  render() {
    let showResults = null;
    if (this.state.showResult) {
      showResults = (
        <div className={styles.results}>
          <h4>Form values</h4>
          <ul>
            <li>Search: {this.state.search}</li>
            <li>Categories: {this.state.categories}</li>
            <li>Location: {this.state.location}</li>
          </ul>
        </div>
      );
    }
    return (
      <div>
        <form className={styles.form} onSubmit={event => this._sendForm(event)}>
          <SelectComponent
            saveSearch={value => this._saveSearch(value)}
            saveCategory={value => this._saveCategory(value)}
          />
          <LocationInputComponent
            saveLocation={value => this._saveLocation(value)}
            sendForm={event => this._sendForm(event)}
          />
          <input
            className={styles.submit}
            type="submit"
            value="Search"
          />
        </form>
        {showResults}
      </div>
    );
  }
}

export default FormComponent;
