import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TextField from "./form/textField";
import TextAreaField from "./form/textAreaField";
import { validator } from "../../utils/validator";

const AddTask = ({ onSubmit }) => {
  const [data, setData] = useState({ headerTask: "", contentTask: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const clearForm = () => {
    setData({ headerTask: "", contentTask: "" });
    setErrors({});
  };

  const validatorConfig = {
    headerTask: {
      isRequired: {
        message: "Заголовок не может быть пустым"
      }
    },
    contentTask: {
      isRequired: {
        message: "Поле не может быть пустым"
      }
    }
  };
  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    onSubmit(data);
    clearForm();
  };

  return (
    <div className="row mb-5">
      <div className="col-md-6 offset-md-3 p-3 shadow rounded-2 border bg-light">
        <div className="col">
          <form onSubmit={handleSubmit}>
            <TextField
              label="Заголовок"
              checkAddTask={true}
              type="text"
              name="headerTask"
              value={data.headerTask || ""}
              onChange={handleChange}
              error={errors.headerTask}
            />
            <TextAreaField
              label="Заметка"
              type="text"
              name="contentTask"
              value={data.contentTask || ""}
              onChange={handleChange}
              error={errors.contentTask}
            />
            <div className="d-flex">
              <button className="btn btn-success mx-auto" disabled={!isValid}>
                Добавить
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
AddTask.propTypes = {
  onSubmit: PropTypes.func
};

export default AddTask;
