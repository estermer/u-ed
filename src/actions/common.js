export const actionTypes = {
  ACTION_STARTED: 'ACTION_STARTED',
  ACTION_STARTED_IGNORE: 'ACTION_STARTED_IGNORE_SPINNER',
  ACTION_COMPLETED: 'ACTION_COMPLETED',
  DISMISS_ERROR: 'DISMISS_ERROR',
  ERROR: 'ERROR',
  SUCCESS: 'REPORT_SUCCESS',
  DISMISS_SUCCESS: 'DISMISS_REPORT_SUCCESS',
};

export function reportError(dispatch, error) {
  const action = {
    type: actionTypes.ERROR,
    error,
  };
  dispatch(action);
}

export function dismissError() {
  return dispatch => {
    const action = {
      type: actionTypes.DISMISS_ERROR,
    };
    dispatch(action);
  };
}

export function catchClientSideError(error) {
  return dispatch => {
    reportError(dispatch, error);
  };
}

export function reportSuccess(dispatch, text, data) {
  const action = {
    type: actionTypes.SUCCESS,
    text,
    data,
  };
  dispatch(action);
}

export function dismissSuccess() {
  return dispatch => {
    const action = {
      type: actionTypes.DISMISS_SUCCESS,
    };
    dispatch(action);
  };
}

export function startAction(dispatch, actionName, ignoreSpinner) {
  const action = {
    type: ignoreSpinner ? actionTypes.ACTION_STARTED_IGNORE : actionTypes.ACTION_STARTED,
    text: `Action Started: ${actionName}`,
  };
  dispatch(action);
}

export function completeAction(dispatch, actionName) {
  const action = {
    type: actionTypes.ACTION_COMPLETED,
    text: `Action Completed: ${actionName}`,
  };
  dismissError();
  dispatch(action);
}

// Handle error coming in as a JSON object string, an actual object, or just a message string
export function handleError(err, dispatch, actionText) {
  completeAction(dispatch, actionText);
  let error = '';
  let message = '';
  try {
    const statusText = JSON.parse(err.statusText);
    message = statusText.message ? statusText.message : 'Oops! Something went wrong';
  } catch (e) {
    message = err.statusText ? err.statusText : err;
  }
  error = new Error(message);
  reportError(dispatch, error);
}
