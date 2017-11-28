import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import classnames from 'classnames';
import validateInput from './validateInput';
import TextFieldGroup from '../common/TextFieldGroup';

class signupform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errors: {},
      isLoading: false,
      redirect: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  onSubmit(e) {
    e.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });

      this.props.userSignupRequest(this.state).then(
        this.setState({ redirect: true }),
        err => this.setState({ errors: err.response.data, isLoading: false }),

      );
    }
  }


  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }
  render() {
    const { errors, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/signin" />;
    }
    return (
      <form onSubmit={this.onSubmit}>

        <TextFieldGroup
          error={errors.username || errors.errorname}
          onChange={this.onChange}
          value={this.state.username}
          field="username"
          placeholder="username"
          autofocus
          required
        />

        <TextFieldGroup
          error={errors.email || errors.errormail}
          onChange={this.onChange}
          value={this.state.email}
          field="email"
          placeholder="email"
        />

        <TextFieldGroup
          error={errors.password}
          onChange={this.onChange}
          value={this.state.password}
          field="password"
          placeholder="password"
        />

        <TextFieldGroup
          error={errors.passwordConfirmation}
          onChange={this.onChange}
          value={this.state.passwordConfirmation}
          field="passwordConfirmation"
          placeholder="Confirm Password"
        />


        <input
          disabled={this.state.isLoading}
          type="submit"
          value="Submit"
          className="btn btn-outline-light btn-block text-dark"
          style={{ cursor: 'pointer' }}
        />
      </form>
    );
  }
}

signupform.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
};
export default signupform;

