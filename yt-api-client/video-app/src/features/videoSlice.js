import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentVideo: null,
  loading: false,
  error: false,
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },

    fetchSuccess: (state, action) => {
      state.currentVideo = action.payload;
      state.loading = false;
    },

    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },

    like: (state, action) => {
      if (!state.currentVideo.Liked.includes(action.payload)) {
        state.currentVideo.Liked.push(action.payload);
        state.currentVideo.disLiked.splice(
          state.currentVideo.disLiked.findIndex(
            (userID) => userID === action.payload,
          ),
          1,
        );
      }
    },

    disLike: (state, action) => {
      if (!state.currentVideo.disLiked.includes(action.payload)) {
        state.currentVideo.disLiked.push(action.payload);
        state.currentVideo.Liked.splice(
          state.currentVideo.Liked.findIndex(
            (userID) => userID === action.payload,
          ),
          1,
        );
      }
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure, like, disLike } =
  videoSlice.actions;

export default videoSlice.reducer;
