import { polyfill } from 'es6-promise';
import { push } from 'react-router-redux';
import { startAction, completeAction, handleError, reportError, reportSuccess } from './common';

polyfill();
