import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isUserSignedIn, isSignInPending, handlePendingSignIn } from 'blockstack';

import { getUserData } from '../actions/user';

import NavBar from './NavBar';
import SideBar from './SideBar';
import Signin from './Signin';

export class App extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    getUserDataAction: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
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
    const { children, pathname, user } = this.props;
    const path = pathname.split('/').slice(1)[0];
    return (
      <div>
        <NavBar user={user} />
        <SideBar highlight={path} />
        {children}
      </div>
    );
  };

  render() {
    return <div>{!isUserSignedIn() ? <Signin /> : this.renderTemplate()}</div>;
  }
}

const mapStateToProps = state => {
  const { user, routing } = state;
  const { pathname } = routing.locationBeforeTransitions;
  return { pathname, user };
};

export default connect(mapStateToProps, {
  getUserDataAction: getUserData,
})(App);
