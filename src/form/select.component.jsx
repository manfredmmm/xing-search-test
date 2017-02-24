import React, { Component, PropTypes } from 'react';

import CategoriesComponent from './categories.component';
import categories from './categories';

import styles from './select.css';

const getNames = idList => (
  idList
    .map(id => categories.find(category => category.id === id))
    .map(category => category.name)
    .join(', ')
);

class SelectComponent extends Component {
  constructor() {
    super();
    this.state = {
      currentFilter: [],
      showCategories: false
    };
  }

  _toggleCategories(event) {
    event.preventDefault();
    this.setState({ showCategories: !this.state.showCategories });
  }

  _changeFilter(values, hideDropdown) {
    this.setState({
      currentFilter: values,
      showCategories: !hideDropdown
    });
    this.props.saveCategory(getNames(values));
  }

  render() {
    let displayFilter = null;
    if (this.state.currentFilter.length > 0 &&
        this.state.currentFilter.length < categories.length) {
      displayFilter = (
        <span>{getNames(this.state.currentFilter)}</span>
      );
    } else {
      displayFilter = (<span>in all categories</span>);
    }
    const showCategories = this.state.showCategories;
    let categoriesDropdown = null;
    if (showCategories) {
      categoriesDropdown = (
        <CategoriesComponent
          categories={categories}
          values={this.state.currentFilter}
          changeFilter={(value, hideDropdown) => this._changeFilter(value, hideDropdown)}
        />
      );
    }
    return (
      <div className={styles.categoriesInput}>
        <input
          type="text"
          autoComplete="off"
          placeholder="Enter keyword"
          className={styles.input}
          required
          onChange={event => this.props.saveSearch(event.target.value)}
        />
        <a className={styles.select} href onClick={event => this._toggleCategories(event)}>
          {displayFilter}
        </a>
        {categoriesDropdown}
      </div>
    );
  }
}

SelectComponent.propTypes = {
  saveSearch: PropTypes.func.isRequired,
  saveCategory: PropTypes.func.isRequired
};

export default SelectComponent;
