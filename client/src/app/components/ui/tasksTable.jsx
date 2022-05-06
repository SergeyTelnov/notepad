import React from "react";
import TaskCard from "./taskCard";
import PropTypes from "prop-types";

const TasksTable = ({ tasks, onRemove }) => {
  return (
    <div className="container mt-5">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {tasks.map((task) => (
          <TaskCard key={task._id} {...task} onRemove={onRemove} />
        ))}
      </div>
    </div>
  );
};
TasksTable.propTypes = {
  tasks: PropTypes.array,
  onRemove: PropTypes.func
};

export default TasksTable;
