import { createSlice } from "@reduxjs/toolkit";
import {
  getPosts,
  getComments,
  createPost,
  createComment,
  addLike,
} from "./postsOperations";

const state = {
  // photo: null,
  posts: [],
  comments: [],
};

const handleFulfilled = (state) => {
  state.isLoading = false;
};

const handlePending = (state) => {
  state.error = null;
  state.isLoading = true;
};

const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const postSlice = createSlice({
  name: "data",
  initialState: state,
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, handlePending)
      .addCase(getPosts.pending, handlePending)
      .addCase(createComment.pending, handlePending)
      .addCase(getComments.pending, handlePending)
      .addCase(addLike.pending, handlePending)
      .addCase(createPost.fulfilled, (state) => {
        state.uri = null;
        state.isLoading = false;
      })
      .addCase(getPosts.fulfilled, (state, { payload }) => {
        state.posts = payload;
        state.isLoading = false;
      })
      .addCase(getComments.fulfilled, (state, { payload }) => {
        state.comments = payload;
        state.isLoading = false;
      })
      .addCase(createComment.fulfilled, handleFulfilled)
      .addCase(addLike.fulfilled, handleFulfilled)
      .addCase(createPost.rejected, handleRejected)
      .addCase(getPosts.rejected, handleRejected)
      .addCase(createComment.rejected, handleRejected)
      .addCase(getComments.rejected, handleRejected)
      .addCase(addLike.rejected, handleRejected);
  },
});

const postReducer = postSlice.reducer;

export default postReducer;
