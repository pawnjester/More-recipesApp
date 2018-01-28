import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import validateInput from './validateInput';
import TextFieldGroup from '../common/TextFieldGroup';
/**
 *
 * @class signupform
 *
 * @extends {React.Component}
 */
class signupform extends React.Component {
  /**
   * Creates an instance of signupform.
   *
   * @param {any} props
   *
   * @memberof signupform
   */
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
  /**
 *
 * @param {any} e
 *
 * @memberof signupform
 *
 * @returns {void}
 */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
 *
 *
 * @param {any} e
 *
 * @memberof signupform
 *
 * @returns {void}
 */
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

  /**
 *@description check for errors
 *
 * @memberof signupform
 *
 * @returns {void}
 */
  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }
  /**
   * @description renders jsx element
   * 
   * @memberof signupform
   *
   * @returns {void}
   */
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
          type="password"
        />

        <TextFieldGroup
          error={errors.passwordConfirmation}
          onChange={this.onChange}
          value={this.state.passwordConfirmation}
          field="passwordConfirmation"
          placeholder="Confirm Password"
          type="password"
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
