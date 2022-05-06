import { createSlice, createAction } from "@reduxjs/toolkit";
import history from "../utils/history";
import tasksService from "../service/tasks.service";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    tasksRequested: (state) => {
      state.isLoading = true;
    },
    tasksReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    tasksCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    tasksRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    taskRemove: (state, action) => {
      state.entities = state.entities.filter((t) => t._id !== action.payload);
    },
    taskUpdated: (state, action) => {
      state.entities[
        state.entities.findIndex((t) => t._id === action.payload._id)
      ] = action.payload;
    }
  }
});

const { actions, reducer: tasksReducer } = tasksSlice;

const {
  tasksReceived,
  tasksRequested,
  tasksCreated,
  tasksRequestFiled,
  taskRemove,
  taskUpdated
} = actions;

const addTaskRequested = createAction("task/addTaskRequested");
const removeTaskRequested = createAction("task/removeTaskRequested");

export const loadTasksList = () => async (dispatch) => {
  dispatch(tasksRequested());
  try {
    const { content } = await tasksService.getTasks();
    dispatch(tasksReceived(content));
  } catch (error) {
    dispatch(tasksRequestFiled(error.message));
  }
};

export const loadTasksListById = (userId) => async (dispatch) => {
  dispatch(tasksRequested());
  try {
    const { content } = await tasksService.getTasksById(userId);
    dispatch(tasksReceived(content));
  } catch (error) {
    dispatch(tasksRequestFiled(error.message));
  }
};

export const createTask = (payload) => async (dispatch) => {
  dispatch(addTaskRequested());
  try {
    const { content } = await tasksService.createTask(payload);
    dispatch(tasksCreated(content));
  } catch (error) {
    dispatch(tasksRequestFiled(error.message));
  }
};

export const removeTask = (id, userId) => async (dispatch) => {
  dispatch(removeTaskRequested());
  try {
    const { content } = await tasksService.removeTask(id);
    if (!content) {
      dispatch(taskRemove(id));
      history.push(`/tasks/${userId}`);
    }
  } catch (error) {
    dispatch(tasksRequestFiled(error.message));
  }
};

export const updateTask = (data, userId) => async (dispatch) => {
  try {
    const { content } = await tasksService.updateTask(data);
    dispatch(taskUpdated(content));
    history.push(`/tasks/${userId}`);
  } catch (error) {
    dispatch(tasksRequestFiled(error.message));
  }
};

export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading;

export const getTasks = () => (state) => {
  return state.tasks.entities;
};

export const getTaskById = (taskId) => (state) => {
  if (state.tasks.entities) {
    return state.tasks.entities.find((t) => t._id === taskId);
  }
};

export default tasksReducer;
