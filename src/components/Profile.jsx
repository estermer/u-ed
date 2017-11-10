import React, { PropTypes } from 'react';

import { isSignInPending, loadUserData, Person } from 'blockstack';

const avatarFallbackImage = 'https://s3.amazonaws.com/onename/avatar-placeholder.png';

export default class Profile extends React.Component {
  static propTypes = {
    handleSignOut: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const { handleSignOut } = this.props;

    this.handleSignOut = handleSignOut.bind(this);

    this.state = {
      person: {
        name() {
          return 'Anonymous';
        },
        avatarUrl() {
          return avatarFallbackImage;
        },
      },
    };
  }

  componentWillMount() {
    this.setState({
      person: new Person(loadUserData().profile),
    });
  }

  render() {
    const { person } = this.state;
    return !isSignInPending() ? (
      <div className="panel-welcome" id="section-2">
        <div className="avatar-section">
          <img
            alt="avatar"
            src={person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage}
            className="img-rounded avatar"
            id="avatar-image"
          />
        </div>
        <h1>
          Hello, <span id="heading-name">{person.name() ? person.name() : 'Nameless Person'}</span>!
        </h1>
        <p className="lead">
          <button
            className="btn btn-primary btn-lg"
            id="signout-button"
            onClick={this.handleSignOut}
          >
            Logout
          </button>
        </p>
      </div>
    ) : null;
  }
}
