import React from 'react';

import HeaderComponent from './header/header.component';
import FormComponent from './form/form.component';

import styles from './search_app.css';

const SearchApp = () => (
  <div>
    <div className={styles.background}>
      <div className={styles.box}>
        <div className={styles.overlay} />
        <HeaderComponent />
        <FormComponent />
      </div>
    </div>
  </div>
);

export default SearchApp;
