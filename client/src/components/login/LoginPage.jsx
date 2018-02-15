import React from 'react';
import { connect } from 'react-redux';
import LoginFormComponent from './loginForm';
import { login } from '../../actions/loginActions';


export const LoginPage = () => (

  <div className="home-inner">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card bg-white text-center card-form">
            <div className="card-body">
              <h3>Sign In</h3>
              <p>Welcome to More-Recipes, Please log in</p>
              <LoginFormComponent login={login} />
            </div>
          </div>
        </div>

      </div>

    </div>

  </div>

);

export default connect(null, { login })(LoginPage);
