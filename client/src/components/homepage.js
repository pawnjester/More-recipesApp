import React from 'react';
import '../styles/home.scss';
import Signupform from './signup/signupform';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userSignupRequest } from '../actions/signupActions';
import { Button } from 'react-bootstrap';
import NavigationBar from './NavigationBar';
import '../styles/home.scss';




class Home extends React.Component {
  render() {
    const {userSignupRequest} = this.props;

    return (
      <div>
      <NavigationBar />
    <header id ="home-section">
      <div className= "dark-overlay">
      <div className= "home-inner">
        <div className ="container">
          <div className= "row">
            <div className="col-lg-8 d-none d-lg-block">
              <h1 className= "display-4" style = {{color: 'fff'}}>Let the  world know about your <strong>Recipe</strong> in three easy steps:</h1>
              <div className="d-flex flex-row">
                <div className ="p-4 align-self-start" >
                  <i className="fa fa-check"></i>
                  
                </div>
                <div className= "p-4 align-self-end" style = {{color: 'fff'}}>
                  Create an account
                </div>
                
              </div>

              <div className="d-flex flex-row">
                <div className ="p-4 align-self-start" >
                  <i className="fa fa-check"></i>
                  
                </div>
                <div className= "p-4 align-self-end" style = {{color: 'fff'}}>
                  Add A Recipe 
                </div>
                
              </div>

              <div className="d-flex flex-row">
                <div className ="p-4 align-self-start" >
                  <i className="fa fa-check"></i>
                  
                </div>
                <div className= "p-4 align-self-end" style = {{color: 'fff'}}>
                  Relax, and let the world view your wonderful recipe
                </div>
                
              </div>
            </div>
            <div className="col-lg-4">
              <div className= "card bg-danger text-center card-form">
                <div className="card-body">
                  <h3>Sign Up Today</h3>
                  <p>Please fill this form to register</p>
                    <Signupform userSignupRequest = {userSignupRequest} />
                </div>
              </div>
            </div>
          </div>
          
        </div>
        
      </div>
      </div>
      
    </header >
    </div>
    )
  }
}

Home.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
}

export default connect(null, { userSignupRequest})(Home)