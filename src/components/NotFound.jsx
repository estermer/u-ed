import React from 'react';
import { Link } from 'react-router';

const NotFound = () => (
  <div className="container container-home">
    <div className="row">
      <div className="col-sm-12 ">
        <h1>Page Not Found</h1>
        <p>It appears you&rsquo;ve found yourself in no man&rsquo;s land.</p>
        <Link to="/">Quick! Return to safety!</Link>
      </div>
    </div>
  </div>
);

export default NotFound;
