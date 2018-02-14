import React, { Component } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import NavigationBar from './NavigationBar';
import changePassword from '../actions/changePassword';
import '../styles/passwordchange.scss';

/**
 *
 *
 * @class ChangePasswordForm
 *
 * @extends {Component}
 */

class ChangePasswordForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      oldPassword: '',
      password: ''
    };
  };

  onNameChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.changePassword(this.state).then((res) => {
      toastr.success('Password successfully changed');
      this.setState({
        oldPassword: '',
        password: ''
      });
    })
      .catch(error => toastr.error(error.response.data.error));
  }

  render() {
    return (
      <div >
        <NavigationBar />
        <div>
          <form className="mx-auto app-login-form card-login">
            <h4 className="black text-center mt-5">Change Your Password</h4>
            <section className="pt-4 input-group">
              <span className="input-group-addon">
                <i className="fa fa-lock black" aria-hidden="true"></i>
              </span>
              <input
                name="oldPassword"
                className="form-control"
                type="password"
                value={this.state.oldPassword}
                onChange={this.onNameChange}
                placeholder="Enter your old password"
              />
            </section>
            <section className="pt-4 pb-3 input-group">
              <span className="input-group-addon">
                <i className="fa fa-lock black" aria-hidden="true"></i>
              </span>
              <input
                name="password"
                className="form-control"
                type="password"
                value={this.state.password}
                onChange={this.onNameChange}
                placeholder="Enter a new Password"
              />
            </section>
            <div className="pt-2">
              <button
                className="btn btn-block text-capitalize password-color"
                onClick={this.onSubmit}
              >
                change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, { changePassword })(ChangePasswordForm);
