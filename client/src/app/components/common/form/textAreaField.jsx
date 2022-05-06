import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ label, name, onChange, value, error }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  const getInputClasses = () => {
    return "form-control" + (error ? " is-invalid" : "");
  };
  return (
    <div>
      <div className="d-flex justify-content-between">
        <label htmlFor={name}> {label}</label>
      </div>
      <div className="input-group mt-2 mb-3">
        <textarea
          name={name}
          value={value}
          id={name}
          onChange={handleChange}
          className={getInputClasses()}
        ></textarea>
      </div>
    </div>
  );
};

TextAreaField.defaultProps = {
  type: "text"
};

TextAreaField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  error: PropTypes.string
};

export default TextAreaField;
