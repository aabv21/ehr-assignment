import { combineReducers } from "@reduxjs/toolkit";
import tools from "./tools";

const createReducer = (asyncReducers) => (state, action) => {
  const combinedReducer = combineReducers({
    tools,
    ...asyncReducers,
  });

  return combinedReducer(state, action);
};

export default createReducer;
