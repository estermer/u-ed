import React from 'react';
import PropTypes from 'prop-types';

import { isUserSignedIn, isSignInPending, handlePendingSignIn } from 'blockstack';

import NavBar from './NavBar';
import Signin from './Signin';

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

  renderTemplate = () => {
    const { children } = this.props;
    return (
      <div>
        <NavBar />
        {children}
      </div>
    );
  };

  render() {
    return <div>{!isUserSignedIn() ? <Signin /> : this.renderTemplate()}</div>;
  }
}
