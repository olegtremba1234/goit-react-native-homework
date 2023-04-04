import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signUp = createAsyncThunk(
  "auth/signup",
  async ({ email, password }) => {
    console.log("email,password", email, password);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log("error", error.code);
      console.log("error.message", error.message);
    }
  }
);
