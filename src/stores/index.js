import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

// Native Reducers
import authReducer from '../reducers/auth';

function configureLogger() {
  // bypass logger middleware altogether in test & prod:
  const dummyLogger = () => next => action => {
    next(action);
  }; // no-op middlware
  if (typeof process !== 'undefined' && ['production', 'test'].includes(process.env.NODE_ENV)) {
    return dummyLogger;
  }

  // take care of non-browser environments: https://github.com/fcomb/redux-logger#logger-object
  const logger = typeof window !== 'undefined' ? window.console : console;

  // filter actions we want to ignore:
  const predicate = (getState, action) =>
    !['redux-form/FOCUS', 'redux-form/BLUR', 'redux-form/CHANGE', 'redux-form/DESTROY'].includes(
      action.type
    );

  // collapse these log messages
  const collapsed = (getState, action) =>
    [
      'ACTION_STARTED',
      'ACTION_STARTED_IGNORE_SPINNER',
      'ACTION_COMPLETED',
      '@@router/LOCATION_CHANGE',
    ].includes(action.type);

  return createLogger({ logger, collapsed, predicate });
}

const reducer = combineReducers({ auth: authReducer, routing: routerReducer });

const historyMiddleware = routerMiddleware(browserHistory);

// Second argument of the create store function is a persisted state (from a refresh)
const store = compose(applyMiddleware(thunk, historyMiddleware, configureLogger()))(createStore)(
  reducer /* , persistedState */
);

export default store;
