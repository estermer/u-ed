import React from 'react';
import PropTypes from 'prop-types';

const PageContentWrapper = ({ content, header }) => (
  <div className="container">
    <div className="row row-top">
      <h2>{header}</h2>
    </div>
    <div className="row">
      <div className="col-xs-12">{content}</div>
    </div>
  </div>
);

PageContentWrapper.propTypes = {
  content: PropTypes.node.isRequired,
  header: PropTypes.string.isRequired,
};

export default PageContentWrapper;
