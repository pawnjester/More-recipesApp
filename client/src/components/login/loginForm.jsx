import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import validateInput from './Validations';
import { login } from '../../actions/loginActions';


class LoginForm extends React.Component {
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
      </form>

    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};
export default connect(null, { login })(LoginForm);
