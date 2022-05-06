import React from "react";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import EditTaskPage from "../components/page/editTaskPage";
import TasksListPage from "../components/page/tasksListPage";
import TasksLoader from "../components/ui/hoc/tasksLoader";
import { getCurrentUserId } from "../store/users";

const Tasks = () => {
  const params = useParams();
  const { taskId } = params;
  const { userId } = params;
  const currentUserId = useSelector(getCurrentUserId());
  return (
    <>
      <TasksLoader>
        {currentUserId === userId ? (
          taskId ? (
            <EditTaskPage taskId={taskId} />
          ) : (
            <TasksListPage />
          )
        ) : (
          <Redirect to={`/tasks/${currentUserId}`} />
        )}
      </TasksLoader>
    </>
  );
};

export default Tasks;
