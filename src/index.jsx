import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route /* IndexRedirect */ } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import store from './stores';

import { App, NotFound /* Profile, Signin */ } from './components';

require('./styles/style.scss');

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(createHistory(), store);

if (typeof window !== 'undefined') {
  const appRoot = document.getElementById('root');

  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          {/* <IndexRedirect to="home" />
          <Route path="home" component={Profile} />
        <Route path="signin" component={Signin} /> */}
          {/* Catch all */}
          <Route path="*" component={NotFound} />
        </Route>
      </Router>
    </Provider>,
    appRoot
  );
}
