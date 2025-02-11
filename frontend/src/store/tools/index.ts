import { combineReducers } from "@reduxjs/toolkit";
import revision from "./revisionSlice";

const reducer = combineReducers({
  revision,
});

export default reducer;
