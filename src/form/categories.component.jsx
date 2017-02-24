import React, { Component, PropTypes } from 'react';

import styles from './categories.css';

class CategoriesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: props.values
    };
  }

  _changeFilter(event) {
    const newValue = parseInt(event.target.value, 10);
    const valueIdx = this.state.values.findIndex(value => value === newValue);
    const newValues = this.state.values;

    if (valueIdx > -1) {
      newValues.splice(valueIdx, 1);
    } else {
      newValues.push(newValue);
    }
    this.setState({ value: newValues });

    this.props.changeFilter(newValues, false);
  }

  _categoryItem(top) {
    return (
      this.props.categories
        .filter(category => category.top === top)
        .map(category =>
          <li key={category.id} className={styles.category}>
            <label className={styles.label} htmlFor={`checkbox-${category.id}`}>
              <input
                id={`checkbox-${category.id}`}
                className={styles.checkbox}
                type="checkbox"
                defaultChecked={this.state.values.find(value => value === category.id)}
                value={category.id}
                onChange={event => this._changeFilter(event)}
              />
              {category.name} ({category.nKeys})
            </label>
          </li>
        )
    );
  }

  _toggleChecked(event) {
    event.preventDefault();
    this.setState({ values: [] });
    this.props.changeFilter([], true);
  }

  render() {
    return (
      <div id="categoriesBox" className={styles.box}>
        <h6 className={styles.subtitle}>
          Top Categories
          <a href className={styles.allLink} onClick={event => this._toggleChecked(event)}>
            Search in all categories
          </a>
        </h6>
        <ul className={styles.topCategories}>{this._categoryItem(true)}</ul>
        <h6 className={styles.subtitle}>More Categories</h6>
        <ul className={styles.otherCategories}>{this._categoryItem(false)}</ul>
      </div>
    );
  }
}

CategoriesComponent.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      nKeys: PropTypes.number.isRequired,
      top: PropTypes.bool.isRequired
    })
  ).isRequired,
  values: PropTypes.arrayOf(PropTypes.number).isRequired,
  changeFilter: PropTypes.func.isRequired
};

export default CategoriesComponent;
