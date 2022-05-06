import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { getTasksLoadingStatus, loadTasksListById } from "../../../store/tasks";
import { getCurrentUserId } from "../../../store/users";

const TasksLoader = ({ children }) => {
  const isLoadingTask = useSelector(getTasksLoadingStatus());
  const dispatch = useDispatch();
  const userId = useSelector(getCurrentUserId());

  useEffect(() => {
    if (!isLoadingTask) {
      dispatch(loadTasksListById(userId));
    }
  }, []);
  if (isLoadingTask) {
    return (
      <div className="d-flex justify-content-center">
        {" "}
        <span className="fs-5">Загрузка...</span>{" "}
      </div>
    );
  }
  return children;
};
TasksLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default TasksLoader;
