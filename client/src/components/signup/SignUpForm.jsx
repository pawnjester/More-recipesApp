import React from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import validateInput from '../validations/signupValidation';
import history from '../../utils/history';
import TextFieldGroupComponent from '../common/TextFieldGroup';
/**
 *
 * @class signupform
 *
 * @extends {React.Component}
 */
export class SignUpForm extends React.Component {
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
 * @param {any} event
 *
 * @memberof signupform
 *
 * @returns {void}
 */
  onSubmit(event) {
    event.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });

      this.props.userSignupRequest(this.state).then(() => {
        swal({
          title: 'welcome',
          text: this.state.username,
          icon: 'success'
        });
        history.push('/recipes');
      }).catch((err) => {
        swal({
          title: 'Oops!',
          text: `Sorry ${err.response.data.error}`,
          icon: 'warning'
        });
        this.setState({
          isLoading: false
        });
      });
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
    const { errors } = this.state;
    return (
      <form onSubmit={this.onSubmit} id="Sign-Up-Form">

        <TextFieldGroupComponent
          error={errors.username || errors.errorname}
          onChange={this.onChange}
          value={this.state.username}
          field="username"
          placeholder="username"
          id="username-field"
          autofocus
          required
        />

        <TextFieldGroupComponent
          error={errors.email || errors.errormail}
          onChange={this.onChange}
          value={this.state.email}
          field="email"
          placeholder="email"
        />

        <TextFieldGroupComponent
          error={errors.password}
          onChange={this.onChange}
          value={this.state.password}
          field="password"
          placeholder="password"
          type="password"
        />

        <TextFieldGroupComponent
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
          id="submit-button"
          style={{ cursor: 'pointer' }}
        />
      </form>
    );
  }
}

SignUpForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
};
export default SignUpForm;
