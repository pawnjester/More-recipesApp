import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import { login } from '../../actions/loginActions';


class LoginPage extends React.Component {
  render() {
    return (

      <div className="home-inner">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="card bg-white text-center card-form">
                <div className="card-body">
                  <h3>Sign In</h3>
                  <p>Welcome to More-Recipes, Please log in</p>
                  <LoginForm login={login} />
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    );
  }
}

LoginPage.proptypes = {
  login: Proptypes.func.isRequired,
};

export default connect(null, { login })(LoginPage);
