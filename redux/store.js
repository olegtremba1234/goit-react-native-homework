import { configureStore, combineReducers } from "@reduxjs/toolkit";

import authReducer from "./auth/authReducer";
import mediaReducer from "./media/mediaReducers";

const rootReducer = combineReducers({
  auth: authReducer,
  media: mediaReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
