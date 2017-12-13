import React from 'react';
import { Link } from 'react-router';

import PageContentWrapper from './PageContentWrapper';

const content = () => (
  <div>
    <p>It appears you&rsquo;ve found yourself in no man&rsquo;s land.</p>
    <Link to="/">Quick! Return to safety!</Link>
  </div>
);

const NotFound = () => <PageContentWrapper content={content()} header="Page Not Found" />;

export default NotFound;
