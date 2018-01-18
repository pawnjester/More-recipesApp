import React, { Component } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import NavigationBar from './NavigationBar';
import checkEmail from '../actions/checkEmail';
import validateInput from './validations/emailValidations';
/* eslint-disable */

class PasswordReset extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    const { email, errors } = this.state;
    if (this.isValid()) {
      this.setState({ errors: {} })
      this.props.checkEmail(this.state).then((response) => {
        toastr.success(`check ${email} for link`)
      })
      .catch((err) => {
        this.setState({ errors: err.response.data});
        toastr.error(this.state.errors.error)
      });
    }
  }

  render() {
    const { errors, redirect } = this.state;
    return (
      <div>
        <NavigationBar />
        <div className='container'>
          <div className='row mt-5 ml-5'>
          <div className="card " style={{width: 700, marginLeft: 130, borderColor: '#ec7026' }}>
            <div className="card-body">
            <h4 className="text-center mb-5">Enter your More-Recipes account</h4>
            <form className="form-group text-center">
            <div className="form-group">
            <p>Find your email address</p>
            <div>
              <input
                type="text"
                placeholder="enter your email"
                name="email"
                onChange={this.onChange}
                value= {this.state.email}
                className = 'p-1 out'
                style={{width: 400, borderRadius: 15 + 'px', borderColor: '#ff4500' }}
                autoFocus
                />
                </div>
                {errors.error || errors.email && <small>{errors.error || errors.email}</small>}
                </div>
              <button
                onClick={this.onSubmit}
                type="button"
                className="btn btn-outline ml-3 pr-3 pl-3"
                style={{borderRadius: 100, backgroundColor: '#ec7026'}}
              > Search </button>
            </form>
            </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// const mapStateToProps = state => ({
//   checkEmail: state.checkEmailReducer.email
// });

export default connect(null, { checkEmail })(PasswordReset)
