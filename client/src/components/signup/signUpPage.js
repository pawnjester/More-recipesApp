import React from 'react';
import '../../styles/signup.scss';
import Signupform from './signupform';



class signUpPage extends React.Component {
  render() {
    return (
      <header id ="home-section">
      <div className= "dark-overlay">
      <div className= "home-inner">
        <div className ="container">
          <div className= "row justify-content-center">
            <div className='col-lg-6'>
              <div className= "card bg-danger text-center card-form">
                <div className="card-body">
                  <h3>Sign Up</h3>
                  <p>Please fill this form to register</p>
                  <Signupform/>
                  <div className="card-body ">                    
                    <p className="card-text text-right text-dark">Have an account? <a href="signin.html"  className="text-white">SIGN IN</a> </p>                    
                  </div>
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

export default signUpPage