import React from 'react';
import '../../styles/signup.scss';
import LoginForm from './loginForm';
import { connect } from 'react-redux';
import {login} from '../../actions/loginActions';
import Proptypes from 'prop-types';



class LoginPage extends React.Component {
  render() {
    return (
      <header id ="home-section">
      <div className= "dark-overlay">
      <div className= "home-inner">
        <div className ="container">
          <div className= "row justify-content-center">
            <div className='col-lg-6'>
              <div className= "card bg-white text-center card-form">
                <div className="card-body">
                  <h3>Sign In</h3>
                  <p>Welcome to More-Recipes, Please log in</p>
                  <LoginForm login = {login}/>
                </div>
              </div>
            </div>
            
          </div>
          
        </div>
        
      </div>
      </div>
      
    </header>
    )
  }
}

LoginPage.proptypes ={
  login: Proptypes.func.isRequired
}

export default connect(null, { login})(LoginPage)