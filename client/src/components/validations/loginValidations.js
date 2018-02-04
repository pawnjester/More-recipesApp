import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
/**
 *
 * @export
 *
 * @param {any} data
 *
 * @returns {void}
 */
export default function validatorInput(data) {
  const errors = {};

  if (Validator.isEmpty(data.identifier)) {
    errors.identifier = 'This field is required';
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
