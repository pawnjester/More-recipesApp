import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
/**
 *
 *
 * @export
 * @param {any} data
 * @returns
 */
export default function validatorInput(data) {
  const errors = {};

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


  return {
    errors,
    isValid: isEmpty(errors),
  };
}
