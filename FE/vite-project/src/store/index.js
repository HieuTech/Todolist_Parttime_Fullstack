import { configureStore } from "@reduxjs/toolkit";
import { todoReducer } from "./slice/todo.slice";


export const store = configureStore({
  reducer: {
    todoReducer: todoReducer,
  },
});