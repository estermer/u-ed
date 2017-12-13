import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isUserSignedIn, isSignInPending, handlePendingSignIn } from 'blockstack';

import { getUserData } from '../actions/user';

import NavBar from './NavBar';
import Signin from './Signin';

export class App extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    getUserDataAction: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  static defaultProps = {
    children: null,
  };

  componentWillMount() {
    const { getUserDataAction } = this.props;
    if (isSignInPending()) {
      handlePendingSignIn().then(() => {
        window.location = window.location.origin;
      });
    } else if (isUserSignedIn()) {
      getUserDataAction();
    }
  }

  renderTemplate = () => {
    const { children, user } = this.props;
    return (
      <div>
        <NavBar user={user} />
        {children}
      </div>
    );
  };

  render() {
    return <div>{!isUserSignedIn() ? <Signin /> : this.renderTemplate()}</div>;
  }
}

const mapStateToProps = state => {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps, {
  getUserDataAction: getUserData,
})(App);
