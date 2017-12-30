import React from 'react';
import Signupform from './signup/signupform';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userSignupRequest } from '../actions/signupActions';
import { Button } from 'react-bootstrap';
import NavigationBar from './NavigationBar';
import '../styles/home.scss';
/*eslint-disable */


class Home extends React.Component {
  render() {
    const { userSignupRequest } = this.props;
    const { isAuthenticated } = this.props.auth;

    const userPage = (
      <header id="home-section">
      <div className="dark-overlay">
        <div className="home-inner">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 d-none d-lg-block">
            <h1 className="display-4 text-center" style={{ color: 'fff' }}> Welcome To More Recipes </h1>
          </div>
            </div>

          </div>

        </div>
      </div>

    </header >
    );

    const guestPage = (
      <header id="home-section">
      <div className="dark-overlay">
        <div className="home-inner">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 d-none d-lg-block">
            <h1 className="display-4" style={{ color: 'fff' }}>Let the  world know about your <strong>Recipe</strong> in three easy steps:</h1>
            <div className="d-flex flex-row">
              <div className="p-4 align-self-start" >
              <i className="fa fa-check back" />

            </div>
              <div className="p-4 align-self-end ">
              Create an account
            </div>

            </div>

            <div className="d-flex flex-row">
              <div className="p-4 align-self-start" >
              <i className="fa fa-check back" />

            </div>
              <div className="p-4 align-self-end ">
              Add A Recipe
            </div>

            </div>

            <div className="d-flex flex-row">
              <div className="p-4 align-self-start" >
              <i className="fa fa-check back" />

            </div>
              <div className="p-4 align-self-end">
              Relax, and let the world view your wonderful recipe
            </div>

            </div>
          </div>
              <div className="col-lg-4">
            <div className="card bg-danger text-center card-form">
              <div className="card-body">
              <h3>Sign Up Today</h3>
              <p>Please fill this form to register</p>
              <Signupform userSignupRequest={userSignupRequest} />
            </div>
            </div>
          </div>
            </div>

          </div>

        </div>
      </div>

    </header >
    )

    return (
      <div>
        <NavigationBar />
        {isAuthenticated ? userPage : guestPage}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

Home.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { userSignupRequest })(Home);
