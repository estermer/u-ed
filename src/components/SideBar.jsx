import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const links = [
  { id: 0, text: 'home' },
  { id: 1, text: 'profile' },
  { id: 2, text: 'messages' },
  { id: 3, text: 'settings' },
];

export default class SideBar extends React.Component {
  static propTypes = {
    highlight: PropTypes.string.isRequired,
  };

  renderLinks = link => {
    const { highlight } = this.props;
    const active = highlight === link.text;
    return (
      <Link
        key={link.text}
        id={link.text}
        className={`nav-link ${active ? 'active' : ''}`}
        to={`/${link.text}`}
      >
        {link.text}
      </Link>
    );
  };

  render() {
    return <nav className="nav nav-pills flex-column">{links.map(this.renderLinks)}</nav>;
  }
}
