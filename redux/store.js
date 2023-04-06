import { configureStore, combineReducers } from "@reduxjs/toolkit";

import authReducer from "./auth/authReducer";
import mediaReducer from "./media/mediaReducers";
import postReducer from "./posts/postsReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
  media: mediaReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
