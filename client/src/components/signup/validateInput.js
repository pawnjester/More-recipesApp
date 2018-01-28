import isEmpty from 'lodash/isEmpty';
import Validator from 'validator';
/**
 * @description validation function
 *
 * @export
 *
 * @param {any} data
 *
 * @returns {void}
 */
export default function validateInput(data) {
  const errors = {};

  if (Validator.isEmpty(data.email)) {
    errors.email = 'This field is required';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is Invalid';
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = 'This field is required';
  } else if (data.username.length < 6) {
    errors.username = 'Username is too short, Must be min. of 6';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  } else if (data.password.length < 6) {
    errors.password = 'Password is too short, Must be min. of 6 ';
  }

  if (Validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = 'This field is required';
  }

  if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Password must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
