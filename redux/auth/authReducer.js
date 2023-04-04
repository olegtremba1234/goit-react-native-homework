import { createSlice } from "@reduxjs/toolkit";
import { signUp } from "./authOperations";

const initialState = {
  email: null,
  password: null,
  name: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(
      signUp.fulfilled,
      (state, { payload }) => (state = payload)
    );
  },
});

const authReducer = authSlice.reducer;

export default authReducer;
