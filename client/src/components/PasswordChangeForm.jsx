import React, { Component } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { Redirect } from 'react-router-dom';
import resetPassword from '../actions/resetPassword';
import NavigationBar from './NavigationBar';
import validateInput from './validations/confirmNewPassword';

/* eslint-disable */

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      passwordConfirmation: '',
      errors: {},
      redirect: false,
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
    if (this.isValid()) {
      this.setState({ errors: {} })
      const { token } = this.props.match.params
      const { password, passwordConfirmation } = this.state;

      this.props.resetPassword( token, password, passwordConfirmation ).then((res) =>{ this.setState({ redirect: true })
      toastr.success('Password successfully changed, Log in now')

    },
    )
    .catch((err) => {
      this.setState({errors: err.response.data})
      toastr.error(`${this.state.errors.error}`)
    })
    }
  }

  render() {
    const { redirect, errors } = this.state;
    if (redirect) {
      return <Redirect to="/newLogin" />;
    }
    return (
      <div>
        <NavigationBar />
        <div className='container'>
          <div className='row mt-5 ml-5'>
          <div className="card " style={{width: 700, marginLeft: 130, borderColor: '#ec7026' }}>
          <div className="card-body">
            <h4 className=" text-center mr-5 mb-5 ">Change your password</h4>
            <form className="form-group">
            <div class="form-group">
            <div>
              <input
                type="password"
                placeholder="password"
                name="password"
                onChange={this.onChange}
                value= {this.state.password}
                className = 'p-1 out'
                style={{width: 400, borderRadius: 10 + 'px', borderColor: '#ff4500', marginLeft: 130}}
                 />
                </div>
                {errors.error || errors.passwordConfirmation && <small style={{marginLeft: 250}}>{errors.error || errors.passwordConfirmation}</small>}
                </div>
                <div class="form-group">
                <div>
              <input
                type="password"
                placeholder="Confirm password"
                name="passwordConfirmation"
                onChange={this.onChange}
                value= {this.state.passwordConfirmation}
                className = 'p-1 out'
                style={{width: 400, borderRadius: 15 + 'px', borderColor: '#ff4500', marginLeft: 130 }} />
                </div>
                {errors.error || errors.passwordConfirmation && <small style={{marginLeft: 250}}>{errors.error || errors.passwordConfirmation}</small>}
                </div>
              <button
                onClick={this.onSubmit}
                type="button"
                className="btn btn-outline-primary pr-3 pl-3"
                style={{borderRadius: 100, backgroundColor: '#ec7026', marginLeft: 250, color: 'black'}}
              > Change Password </button>
            </form>
          </div>
        </div>
        </div>
        </div>
      </div>
    );
  }
}


export default connect(null, { resetPassword })(PasswordChangeForm);
