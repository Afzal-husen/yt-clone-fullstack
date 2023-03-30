import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    logInSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logOut: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    subscription: (state, action) => {
      //check the user subscription
      if (state.currentUser.subscribedChannels.includes(action.payload)) {
        state.currentUser.subscribedChannels.splice(
          //remove the user if unsubscribed
          state.currentUser.subscribedChannels.findIndex(
            (channelId) => channelId === action.payload,
          ),
          1,
        );
      } else {
        state.currentUser.subscribedChannels.push(action.payload); //add user if subscribed
      }
    },
  },
});

export const { loginStart, logInSuccess, loginFailure, logOut, subscription } =
  userSlice.actions;

export default userSlice.reducer;
