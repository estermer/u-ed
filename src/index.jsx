import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// Require Sass file so webpack can build it
require('bootstrap/dist/css/bootstrap.css');
require('./styles/style.css');

ReactDOM.render(<App />, document.getElementById('root'));
