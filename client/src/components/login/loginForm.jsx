import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import validateInput from './validations';
import { login } from '../../actions/loginActions';

/**
 *
 * @class LoginForm
 *
 * @extends {React.Component}
 */
class LoginForm extends React.Component {
  /**
   * Creates an instance of LoginForm.
   *
   * @param {any} props
   *
   * @memberof LoginForm
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {},
      isLoading: false,
      redirect: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  /**
 * @description submit action
 *
 * @param {any} e
 *
 * @memberof LoginForm
 *
 * @returns {void}
 */
  onSubmit(e) {
    e.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.login(this.state).then(
        (res) => {
          this.setState({ redirect: true });
        },
        err => this.setState({ errors: err.response.data, isLoading: false }),
      );
    }
  }
  /**
 *
 * @param {any} e
 *
 * @memberof LoginForm
 *
 * @returns {void}
 */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  /**
 *
 * @memberof LoginForm
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
 *@description renders jsx element
 *
 * @memberof LoginForm
 *
 * @returns {void}
 */
  render() {
    const { errors, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/recipes" />;
    }
    return (
      <form onSubmit={this.onSubmit}>
        {errors.message && <div className="alert alert-danger">{errors.message}</div>}
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
          error={errors.password}
          onChange={this.onChange}
          value={this.state.password}
          field="password"
          placeholder="password"
          type="password"
        />
        <input
          disabled={this.state.isLoading}
          type="submit"
          value="Submit"
          className="btn btn-outline-danger btn-block text-dark"
        />
        <Link to="/reset_password" className="text-red mt-5">Forgot Password?</Link>
      </form>

    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};
export default connect(null, { login })(LoginForm);
