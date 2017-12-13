import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { loadUserData, Person, signUserOut } from 'blockstack';

const avatarFallbackImage = 'https://s3.amazonaws.com/onename/avatar-placeholder.png';

export default class NavBar extends React.Component {
  state = {
    person: {
      name() {
        return 'Anonymous';
      },
      avatarUrl() {
        return avatarFallbackImage;
      },
    },
    showUserMenu: false,
    timeoutReference: null,
  };

  componentWillMount() {
    this.setState({
      person: new Person(loadUserData().profile),
    });
  }

  getUserMenuClass = showUserMenu => {
    const classText = 'nav-item dropdown pull-xs-right';
    if (showUserMenu) {
      return `${classText} show`;
    }
    return classText;
  };

  closeUserMenu = () => {
    this.setState({ showUserMenu: false });
  };

  navMouseLeave = () => {
    if (this.state.showUserMenu) {
      this.clearTimeoutReference();
      this.setState({ timeoutReference: setTimeout(this.closeUserMenu, 500) });
    }
  };

  navMouseEnter = () => {
    if (this.state.showUserMenu) {
      this.clearTimeoutReference();
    }
  };

  clearTimeoutReference = () => {
    const { timeoutReference } = this.state;
    if (timeoutReference !== null) {
      clearTimeout(timeoutReference);
    }
  };

  handleSignOut = e => {
    e.preventDefault();
    this.closeUserMenu();
    signUserOut(window.location.origin);
  };

  toggleMenu = e => {
    const { showUserMenu } = this.state;
    e.preventDefault();
    this.setState({ showUserMenu: !showUserMenu });
  };

  renderUserMenu = () => {
    const { person, showUserMenu } = this.state;

    return (
      <ul className="nav navbar-nav">
        <li
          className={this.getUserMenuClass(showUserMenu)}
          onMouseLeave={this.navMouseLeave}
          onMouseEnter={this.navMouseEnter}
        >
          <button
            className="nav-link dropdown-toggle link-button"
            aria-haspopup="true"
            aria-expanded={showUserMenu}
            onClick={this.toggleMenu}
          >
            <img
              src={person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage}
              className="img-rounded tiny d-inline-block align-top"
              id="avatar-image"
              alt="avatar"
            />
          </button>
          <div className={`dropdown-menu ${showUserMenu ? 'show' : ''}`}>
            <Link className="dropdown-item nav-link" to="/" onClick={this.closeUserMenu}>
              Home <span className="sr-only">(current)</span>
            </Link>
            <Link className="dropdown-item nav-link" to="/" onClick={this.closeUserMenu}>
              Features
            </Link>
            <Link className="dropdown-item nav-link" to="/" onClick={this.closeUserMenu}>
              Pricing
            </Link>
            <div className="dropdown-divider" />
            <button
              className="dropdown-item log-out-link button-link"
              href="#"
              onClick={this.handleSignOut}
            >
              Logout
            </button>
          </div>
        </li>
      </ul>
    );
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-faded">
        <div className="container">
          <Link className="navbar-brand" href="/">
            {/* <img src="/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt=""> */}
            UpSkill
          </Link>
          {this.renderUserMenu()}
        </div>
      </nav>
    );
  }
}
