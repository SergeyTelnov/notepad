import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTaskById, updateTask, removeTask } from "../../store/tasks";
import PropTypes from "prop-types";
import TextField from "../common/form/textField";
import TextAreaField from "../common/form/textAreaField";
import { getCurrentUserId } from "../../store/users";

const EditTaskPage = ({ taskId }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [errors] = useState({});
  const task = useSelector(getTaskById(taskId));
  const userId = useSelector(getCurrentUserId());

  useEffect(() => {
    if (task && !data) {
      setData({ ...task });
    }
  }, [task]);

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const removeTaskById = (taskId) => {
    dispatch(removeTask(taskId, userId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTask({ ...data }, userId));
  };

  if (data) {
    return (
      <div className="container mt-5">
        <div className="row mb-5">
          <div className="col-md-6 offset-md-3 p-3 shadow rounded-2 border bg-light">
            <div className="col">
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Заголовок"
                  type="text"
                  name="headerTask"
                  value={data.headerTask || ""}
                  onChange={handleChange}
                  error={errors.content}
                />
                <TextAreaField
                  label="Заметка"
                  type="text"
                  name="contentTask"
                  value={data.contentTask || ""}
                  onChange={handleChange}
                  error={errors.content}
                />
                <div className="d-flex">
                  <button className="btn btn-success mx-auto">Обновить</button>
                  <button
                    type="reset"
                    className="btn btn-danger mx-auto"
                    onClick={() => removeTaskById(taskId)}
                  >
                    Удалить
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <span>Загрузка...</span>;
  }
};
EditTaskPage.propTypes = {
  taskId: PropTypes.string
};

export default EditTaskPage;
