import { createSlice } from "@reduxjs/toolkit";
import { signIn, signUp, refresh, signout } from "./authOperations";

const initialState = {
  userId: null,
  name: null,
  email: null,
  photoURL: null,
  stateChange: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, { payload }) => (state = payload))
      .addCase(signIn.fulfilled, (state, { payload }) => (state = payload))
      .addCase(refresh.fulfilled, (state, { payload }) => (state = payload))
      .addCase(signout.fulfilled, (state) => (state = initialState))
      .addCase(refresh.rejected, (state) => (state = initialState));
  },
});

const authReducer = authSlice.reducer;

export default authReducer;
