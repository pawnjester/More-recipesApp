
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

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Recipe name shouldn\'t be empty';
  } else if (!Validator.isLength(data.name, {
    min: 6, max: 20
  })) {
    errors.name = 'Recipe name should be at least 6 characters, max 20 characters';
  } else if (data.name.trim() === '') {
    errors.name = 'Recipe name cannot contain spaces';
  }

  if (Validator.isEmpty(data.ingredients)) {
    errors.ingredients = 'Ingredients should have at least 1 item';
  } else if (data.ingredients.trim() === '') {
    errors.ingredients = 'Ingredients cannot contain spaces';
  }

  if (Validator.isEmpty(data.method)) {
    errors.method = 'Recipe should have cook directions';
  } else if (!Validator.isLength(data.method, { min: 5 })) {
    errors.method = 'This recipe needs directions to cook';
  } else if (data.method.trim() === '') {
    errors.method = 'Recipe method cannot spaces';
  }
  if (Validator.isEmpty(data.cookingTime)) {
    errors.cookingTime = 'Recipe should have a cooking time';
  } else if (!Validator.isNumeric(data.cookingTime)) {
    errors.cookingTime = 'Please enter a number as a cooking time';
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
}
