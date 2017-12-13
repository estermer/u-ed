import React from 'react';
// import PropTypes from 'prop-types';

import { isSignInPending, loadUserData, Person } from 'blockstack';

const avatarFallbackImage = 'https://s3.amazonaws.com/onename/avatar-placeholder.png';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
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
            src={person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage}
            className="img-rounded tiny"
            id="avatar-image"
            alt="avatar"
          />
        </div>
        <h1>
          Hello, <span id="heading-name">{person.name() ? person.name() : 'Nameless Person'}</span>!
        </h1>
      </div>
    ) : null;
  }
}
