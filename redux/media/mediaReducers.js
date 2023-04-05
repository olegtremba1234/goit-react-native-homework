import { createSlice } from "@reduxjs/toolkit";
import { uploadPhotoToServer, delPhoto, updateAvatar } from "./mediaOperations";
import { signup, signin, signout, refresh } from "../auth/authOperations";

const initialPrestate = {
  photo: null,
  isLoading: false,
  error: null,
};

const handlePending = (state) => {
  state.error = null;
  state.isLoading = true;
};

const handleFulfilled = (state) => {
  state.isLoading = false;
};

const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const mediaSlice = createSlice({
  name: "media",
  initialState: initialPrestate,
  extraReducers: (builder) => {
    builder
      .addCase(uploadPhotoToServer.pending, handlePending)
      .addCase(delPhoto.pending, handlePending)
      .addCase(updateAvatar.pending, handlePending)
      .addCase(uploadPhotoToServer.fulfilled, (state, { payload }) => {
        state.uri = payload;
        state.isLoading = false;
      })
      .addCase(delPhoto.fulfilled, (state) => {
        state.uri = null;
        state.isLoading = false;
      })
      .addCase(updateAvatar.fulfilled, handleFulfilled)
      .addCase(uploadPhotoToServer.rejected, handleRejected)
      .addCase(updateAvatar.rejected, handleRejected)
      .addCase(delPhoto.rejected, handleRejected);
  },
});

const mediaReducer = mediaSlice.reducer;

export default mediaReducer;
