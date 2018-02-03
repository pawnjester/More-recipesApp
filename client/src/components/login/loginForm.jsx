import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import history from '../../utils/history';
import TextFieldGroup from '../common/TextFieldGroup';
import validateInput from '../validations/loginValidations';
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
      identifier: '',
      password: '',
      errors: {},
      isLoading: false,
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
      this.props.login(this.state).then(() => {
        swal({
          title: 'welcome',
          text: this.state.username,
          icon: 'success'
        });
        history.push('/recipes');
      })
        .catch((err) => {
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
    const { errors } = this.state;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          {errors.message && <div className="alert alert-danger">{errors.message}</div>}
          <TextFieldGroup
            error={errors.identifier || errors.errorname}
            onChange={this.onChange}
            value={this.state.identifier}
            field="identifier"
            placeholder="enter your username or email"
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
          <div>
            <Link to="/reset_password" className="forgot mt-5">Forgot Password?</Link><br />
            <Link to="/" className="mt-5">Sign Up</Link>
          </div>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};
export default connect(null, { login })(LoginForm);
