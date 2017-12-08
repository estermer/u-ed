import React from 'react';
import PropTypes from 'prop-types';

import { isSignInPending, handlePendingSignIn } from 'blockstack';

export default class App extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: null,
  };

  componentWillMount() {
    if (isSignInPending()) {
      handlePendingSignIn().then(() => {
        window.location = window.location.origin;
      });
    }
  }

  render() {
    const { children } = this.props;
    return (
      <div className="site-wrapper">
        <div className="site-wrapper-inner">{children}</div>
      </div>
    );
  }
}
