import React from 'react';
import '../../styles/signup.scss';


class signupform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value})
  }

  onSubmit(e) {
    e.preventdefault();
    console.log(this.state);
  }
  render() {
    return (
                <form onSubmit = {this.onSubmit}>
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
                      value = {this.state.username} 
                      onChange = {this.onChange}                     
                       type="text" 
                      name = 'username'
                       className="form-control form-control-lg" 
                       placeholder="Username"/>
                      
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
                      value = {this.state.pass} 
                      onChange = {this.onChange} 
                      type="password" 
                      name = 'password' 
                      className="form-control form-control-lg" 
                      placeholder="Confirm Password"/>
                      
                    </div>
                    
                    <input type="submit" value ="Submit" className="btn btn-outline-light btn-block" />
                  </form>
    )
  }
}

export default signupform;

