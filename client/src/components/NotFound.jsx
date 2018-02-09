import React from 'react';
import NavigationBarComponent from './NavigationBar';

const NotFound = () =>
  (<div>
    <NavigationBarComponent search="true" />
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-4">
          <i className="fa fa-3x fa-exclamation-circle " style={{ fontSize: 300 }} /><br />
        </div>
        <div className="col-md-8">
          <h3 style={{ fontSize: 40 }}>Page not found</h3><br />
          <p>We are sorry but the page you are looking for does not exist.</p>
        </div>
      </div>
    </div>
  </div>
  );

export default NotFound;
