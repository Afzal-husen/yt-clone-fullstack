import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentComments: [],
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    fetchComment: (state, action) => {
      state.currentComments = action.payload;
    },
    deleteComment: (state) => {
      return state.currentComments;
    },
    addComments: (state, actions) => {
      state.currentComments = state.currentComments.push(actions.payload);
    },
  },
});

export const { addComments, deleteComment, fetchComment } =
  commentSlice.actions;
export default commentSlice.reducer;
