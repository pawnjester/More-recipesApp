import React from 'react';
import PropTypes from 'prop-types';


class signupform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.userSignupRequest(this.state);
  }
  render() {
    return (
                <form onSubmit = {this.onSubmit}>
                                      
                    <div className= "form-group">
                      <input
                      value = {this.state.username} 
                      onChange = {this.onChange}                     
                       type="text" 
                      name = 'username'
                       className="form-control form-control-lg" 
                       placeholder="Username"/>                      
                    </div>

                    <div className= "form-group">
                      <input
                      value = {this.state.email} 
                      onChange = {this.onChange}  
                      type="email"
                       name = 'email'
                        className="form-control form-control-lg"
                         placeholder="Email"/>                      
                    </div>

                    <div className= "form-group">
                      <input 
                      value = {this.state.password} 
                      onChange = {this.onChange} 
                      type="password" 
                      name = 'password'
                       className="form-control form-control-lg"
                        placeholder="Password"/>
                      
                    </div>
                    <div className= "form-group">
                      <input 
                      value = {this.state.passwordConfirmation} 
                      onChange = {this.onChange} 
                      type="password" 
                      name = 'passwordConfirmation' 
                      className="form-control form-control-lg" 
                      placeholder="Confirm Password"/>
                      
                    </div>
                    <input 
                    type="submit"
                    value ="Submit"
                    className="btn btn-outline-light btn-block" />
                  </form>
    )
  }
}

signupform.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
}
export default signupform;

