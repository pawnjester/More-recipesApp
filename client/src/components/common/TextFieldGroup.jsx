import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';


export const TextFieldGroup = ({
  field, value, error, type, onChange, placeholder, id
}) => (
  <div className={classnames('form-group', { 'has-error': error })}>
    <input
      value={value}
      onChange={onChange}
      type={type}
      name={field}
      placeholder={placeholder}
      className="form-control form-control-lg"
      id={id}
    />

    {error && <span className="help-block"> {error}</span>}
  </div>
);

TextFieldGroup.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  id: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: 'text',
  error: ''
};


export default TextFieldGroup;
