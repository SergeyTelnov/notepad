import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({
  label,
  type,
  value,
  name,
  onChange,
  error,
  checkAddTask
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  const getInputClasses = () => {
    return "form-control" + (error ? " is-invalid" : "");
  };
  return (
    <div className="mb-3">
      <label htmlFor={name}>
        <h6>{label}</h6>
      </label>
      <div className="input-group input-group-sm mb-3">
        <input
          type={showPassword ? "text" : type}
          value={value}
          id={name}
          name={name}
          onChange={handleChange}
          className={getInputClasses()}
        />
        {type === "password" && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={toggleShowPassword}
          >
            <i className={"bi bi-eye" + (showPassword ? "-slash" : "")}></i>
          </button>
        )}
        {checkAddTask
          ? ""
          : error && <div className="invalid-feedback ">{error}</div>}
      </div>
    </div>
  );
};

TextField.defaultProps = {
  type: "text"
};

TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  checkAddTask: PropTypes.bool
};

export default TextField;
