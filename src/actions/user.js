import { loadUserData } from 'blockstack';
import { polyfill } from 'es6-promise';
// import { push } from 'react-router-redux';
import {
  startAction,
  completeAction /* , handleError, reportError, reportSuccess */,
} from './common';

polyfill();

export const actionTypes = {
  GET_USER_DATA: 'GET_USER_DATA',
};

const getUserDataSuccess = profile => ({
  type: actionTypes.GET_USER_DATA,
  profile,
});

export function getUserData() {
  const actionText = 'Getting User Data';
  return dispatch => {
    startAction(dispatch, actionText);
    const data = loadUserData().profile;
    dispatch(getUserDataSuccess(data));
    completeAction(dispatch, actionText);
  };
}
