import React from 'react';

import { isUserSignedIn, redirectToSignIn, signUserOut } from 'blockstack';

import Profile from './Profile';
import Signin from './Signin';

export default class HomePage extends React.Component {
  handleSignIn = e => {
    e.preventDefault();
    redirectToSignIn();
  };

  handleSignOut = e => {
    e.preventDefault();
    signUserOut(window.location.origin);
  };

  render() {
    return (
      <div>
        {!isUserSignedIn() ? (
          <Signin handleSignIn={this.handleSignIn} />
        ) : (
          <Profile handleSignOut={this.handleSignOut} />
        )}
      </div>
    );
  }
}
