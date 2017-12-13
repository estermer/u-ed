import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const links = [
  { id: 0, text: 'home' },
  { id: 1, text: 'courses' },
  { id: 2, text: 'portfolios' },
  { id: 3, text: 'settings' },
];

export default class SideBar extends React.Component {
  static propTypes = {
    highlight: PropTypes.string.isRequired,
  };

  renderLinks = link => {
    const { highlight } = this.props;
    const active = highlight === link.text;
    const displayText = link.text.charAt(0).toUpperCase() + link.text.slice(1);
    return (
      <Link
        key={link.text}
        id={link.text}
        className={`nav-link ${active ? 'active' : ''}`}
        to={`/${link.text}`}
      >
        {displayText}
      </Link>
    );
  };

  render() {
    return (
      <div className="sidebar-nav">
        <nav className="nav nav-pills flex-column">{links.map(this.renderLinks)}</nav>
      </div>
    );
  }
}
