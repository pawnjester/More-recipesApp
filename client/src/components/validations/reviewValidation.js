
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
/**
 *
 * @export
 *
 * @param {any} content
 *
 * @returns {void}
 */
export default function validatorInput(content) {
  const errors = {};

  if (Validator.isEmpty(content.data)) {
    errors.data = 'You cannot submit an empty review';
  } else if ((content.data).trim() === '') {
    errors.data = 'You cannot input spaces';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
