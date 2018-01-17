import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
/**
 *
 *
 * @export
 * @param {any} data
 * @returns
 */
export default function emailValidator(data) {
  const errors = {};
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is Invalid';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Please enter an email address';
  }


  return {
    errors,
    isValid: isEmpty(errors),
  };
}
