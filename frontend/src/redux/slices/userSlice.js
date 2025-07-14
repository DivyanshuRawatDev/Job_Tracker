import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../utils/axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/firebase";
import { setPersistence, browserLocalPersistence } from "firebase/auth";

export const fetchGoogleAuth = createAsyncThunk(
  "auth/google",
  async function () {
    try {
      await setPersistence(auth, browserLocalPersistence);

      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      console.log(idToken, "token");

      const response = await API.post("auth/google", {
        idToken,
      });

      console.log(response.data, "Asd");

      return response.data;
    } catch (error) {
      console.log("Error while fetch google Auth : " + error.message);
    }
  }
);

export const fetchUserLogout = createAsyncThunk(
  "auth/logout",
  async function (req, res) {
    try {
      const response = await API.get("auth/logout");
      return response.data;
    } catch (error) {
      console.log("Error while fetch google Auth : " + error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    isError: false,
    user: {},
  },

  extraReducers: (builder) => {
    //google auth
    builder.addCase(fetchGoogleAuth.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchGoogleAuth.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload?.data;
    });

    builder.addCase(fetchGoogleAuth.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    // Logout
    builder.addCase(fetchUserLogout.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchUserLogout.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = {};
    });

    builder.addCase(fetchUserLogout.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default userSlice.reducer;
