import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Signupform from './SignUpForm';
import userSignupRequest from '../../actions/signupActions';


export const SignUpPage = props => (
  <header id="home-section">
    <div className="dark-overlay">
      <div className="home-inner">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="card bg-white text-center card-form">
                <div className="card-body">
                  <h3>Sign Up</h3>
                  <p>Please fill this form to register</p>
                  <Signupform userSignupRequest={props.userSignupRequest} />
                  <div className="card-body ">
                    <p className="card-text text-right text-dark">
                    Have an account?
                      <a
                        href="signin.html"
                        className="text-danger"
                      >
                    SIGN UP
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>

  </header>
);


SignUpPage.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
};

export default connect(null, { userSignupRequest })(SignUpPage);
