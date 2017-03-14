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
      currentFilter: []
    };
  }

  _toggleCategories(event) {
    event.preventDefault();
    this.props.toggleCategories(!this.props.showCategories);
  }

  _changeFilter(values, showDropdown) {
    this.setState({ currentFilter: values });
    if (!showDropdown) {
      this.props.toggleCategories(!this.props.showCategories);
    }
    this.props.saveCategory(getNames(values));
  }

  _closeDropdown() {
    if (this.props.showCategories) {
      this.props.toggleCategories(!this.props.showCategories);
    }
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

    let categoriesDropdown = null;
    if (this.props.showCategories) {
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
          onFocus={() => this._closeDropdown()}
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
  saveCategory: PropTypes.func.isRequired,
  toggleCategories: PropTypes.func.isRequired,
  showCategories: PropTypes.bool.isRequired
};

export default SelectComponent;
