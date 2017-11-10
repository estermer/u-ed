import React, { PropTypes } from 'react';

export default class Signin extends React.Component {
  static propTypes = {
    handleSignIn: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const { handleSignIn } = this.props;
    this.handleSignIn = handleSignIn.bind(this);
  }

  render() {
    return (
      <div className="panel-landing" id="section-1">
        <h1 className="landing-heading">Hello, Blockstack!</h1>
        <p className="lead">
          <button className="btn btn-primary btn-lg" id="signin-button" onClick={this.handleSignIn}>
            Sign In with Blockstack
          </button>
        </p>
      </div>
    );
  }
}
