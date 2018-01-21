/* eslint-disable */

import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validatorInput(data) {
  let errors ={};
  const whiteSpace = /\s/;

  if (Validator.isEmpty(data.name)) {
    errors.name = 'This field is required';
  }

  if (Validator.isEmpty(data.ingredients)) {
    errors.ingredients = 'This field is required';
  }

  if (Validator.isEmpty(data.method)) {
    errors.method = 'This field is required';
  }



  return {
    errors,
    isValid: isEmpty(errors)
  };
}
