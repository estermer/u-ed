import React from 'react';
// import PropTypes from 'prop-types';

import { redirectToSignIn } from 'blockstack';

export default class Signin extends React.Component {
  handleSignIn = e => {
    e.preventDefault();
    redirectToSignIn();
  };

  render() {
    return (
      <div className="panel-landing" id="section-1">
        <h1 className="landing-heading">UpSkill</h1>
        <p className="lead">
          <button className="btn btn-primary btn-lg" id="signin-button" onClick={this.handleSignIn}>
            Sign In with Blockstack
          </button>
        </p>
      </div>
    );
  }
}
