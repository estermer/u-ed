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
      <div className="jumbotron">
        <h1 className="display-3">UpSkill</h1>
        <p className="lead">Show off your skills</p>
        <hr className="my-4" />
        <p>With Blockstack Identity and Storage, you can own your transcripts</p>
        <p className="lead">
          <button className="btn btn-primary btn-lg" id="signin-button" onClick={this.handleSignIn}>
            Sign In with Blockstack
          </button>
        </p>
      </div>
    );
  }
}
