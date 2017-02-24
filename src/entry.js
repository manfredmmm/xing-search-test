import React from 'react';
import ReactDOM from 'react-dom';

import SearchApp from './search_app';

require('./normalize.css');

ReactDOM.render(
  React.createElement(SearchApp),
  document.getElementById('app'),
);
