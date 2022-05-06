import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasks";
import usersReducer from "./users";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  users: usersReducer
});

export function createStore() {
  return configureStore({
    reducer: rootReducer
  });
}
