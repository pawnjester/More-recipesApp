import React from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from './NavigationBar';


const RedirectToLogin = () => (
  <div>
    <NavigationBar />
    <div className="container">
      <div className="row">
        <div className="card mt-5" style={{ marginLeft: 300 }}>
          <div card-body="card-body" >
            <p className="mt-5 p-5" >Your Password has been changed, <br /><br />Please click this <Link to="/signin">link</Link> to login</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);


export default RedirectToLogin;
