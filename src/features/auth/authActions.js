import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut
} from "firebase/auth";
import { auth } from "../../firebase"; // Make sure your Firebase configuration is set up properly

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ email, password, username }, { rejectWithValue }) => {
    try {
      // Register the user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update the user's profile with the username
      await updateProfile(user, { displayName: username });

      // Return the user data
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      };
    } catch (error) {
      // Handle Firebase errors
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // You can return relevant user information here
      return { uid: user.uid, email: user.email, token: user.accessToken };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      // Sign out the user
      await signOut(auth);

      // Optionally, you can return a message or null
      return "User successfully logged out";
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
