import {
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, storage } from "../../firebase/config";

export const uploadPhotoToServer = createAsyncThunk(
  "media/uploadphoto",
  async ({ photo, path }, { rejectWithValue }) => {
    try {
      const response = await fetch(photo);
      const file = await response.blob();
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file);
      const url = getDownloadURL(ref(storage, path));
      return url;
    } catch ({ message }) {
      return rejectWithValue(message);
    }
  }
);

export const updateAvatar = createAsyncThunk(
  "prestate/updateAvatar",
  async ({ uri, path }, { rejectWithValue }) => {
    try {
      const response = await fetch(uri);
      const file = await response.blob();
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(ref(storage, path));
      await updateProfile(auth.currentUser, { photoURL: url });
    } catch ({ message }) {
      return rejectWithValue(message);
    }
  }
);

export const delPhoto = createAsyncThunk(
  "prestate/delPhoto",
  async (uri, { rejectWithValue }) => {
    try {
      const desertRef = ref(storage, uri);
      await deleteObject(desertRef);
    } catch ({ message }) {
      return rejectWithValue(message);
    }
  }
);
