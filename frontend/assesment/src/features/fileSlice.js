import { createSlice } from "@reduxjs/toolkit";

const fileSlice = createSlice({
  name: "files",
  initialState: {
    files: []
  },
  reducers: {
    setFiles: (state, action) => {
      state.files = action.payload;
    },
     updateFileViews: (state, action) => {
      state.files = state.files.map((f) =>
        f._id === action.payload._id ? action.payload : f
      );
    }
  }
});

export const { setFiles, updateFileViews } = fileSlice.actions;
export default fileSlice.reducer;