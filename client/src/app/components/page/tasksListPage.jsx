import React from "react";
import TasksTable from "../ui/tasksTable";
import AddTask from "../common/addTask";
import { orderBy } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  createTask,
  getTasks,
  getTasksLoadingStatus,
  removeTask
} from "../../store/tasks";
import { useParams } from "react-router-dom";

const TasksListPage = () => {
  const { userId } = useParams();
  const tasks = useSelector(getTasks());
  const dispatch = useDispatch();
  const isLoading = useSelector(getTasksLoadingStatus());
  const sortedTask = orderBy(tasks, ["created_at"], ["desc"]);

  const handleSubmit = (data) => {
    dispatch(createTask({ ...data, pageId: userId }));
  };

  const handleRemoveTask = (id) => {
    dispatch(removeTask(id, userId));
  };
  return (
    <div className="container mt-5">
      <AddTask onSubmit={handleSubmit} />
      <hr />
      {sortedTask.length > 0 ? (
        <>
          {!isLoading ? (
            <TasksTable tasks={tasks} onRemove={handleRemoveTask} />
          ) : (
            <span>Загрузка...</span>
          )}
        </>
      ) : (
        <div className="d-flex justify-content-center">
          <span>Заметок пока нет</span>
        </div>
      )}
    </div>
  );
};

export default TasksListPage;
