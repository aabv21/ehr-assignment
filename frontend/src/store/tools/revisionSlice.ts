import { createSlice } from "@reduxjs/toolkit";

const revisionSlice = createSlice({
  name: "revision",
  initialState: { cache: {} },
  reducers: {
    refresDataRevision: (state, action) => {
      state.cache = {};
      state[action.payload.event] = (state[action.payload.event] ?? 0) + 1;
    },
  },
});

export const { refresDataRevision } = revisionSlice.actions;

export default revisionSlice.reducer;
