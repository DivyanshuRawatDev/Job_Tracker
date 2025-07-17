import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../utils/axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/firebase";

export const fetchUserSignup = createAsyncThunk(
  "auth/signup",
  async function ({ name, email, password, gender }) {
    try {
      const result = await API.post("auth/signup", {
        name,
        email,
        password,
        gender,
      });
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchUserLogin = createAsyncThunk(
  "auth/login",
  async function ({ email, password }) {
    try {
      const result = await API.post("auth/login", {
        email,
        password,
      });
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchGoogleAuth = createAsyncThunk(
  "auth/google",
  async function () {
    try {
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
  async function () {
    try {
      const response = await API.get("auth/logout");
      return response.data;
    } catch (error) {
      console.log("Error while fetch google Auth : " + error.message);
    }
  }
);

export const fetchSendOTP = createAsyncThunk(
  "auth/otp",
  async function ({ email }) {
    try {
      const response = await API.post("auth/send-otp", { email });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchVerifyOTP = createAsyncThunk(
  "auth/otp",
  async function ({ email, otp }) {
    try {
      const response = await API.post("auth/verify-otp", { email, otp });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoadingGoogle: false,
    isLoadingSignup: false,
    isLoadingLogin: false,
    isError: false,
    user: {},
  },

  extraReducers: (builder) => {
    //google auth
    builder.addCase(fetchGoogleAuth.pending, (state) => {
      state.isLoadingGoogle = true;
      state.isError = false;
    });
    builder.addCase(fetchGoogleAuth.fulfilled, (state, action) => {
      state.isLoadingGoogle = false;
      state.user = action.payload?.data;
    });

    builder.addCase(fetchGoogleAuth.rejected, (state) => {
      state.isLoadingGoogle = false;
      state.isError = true;
    });

    // Signup
    builder.addCase(fetchUserSignup.pending, (state) => {
      state.isLoadingSignup = true;
      state.isError = false;
    });
    builder.addCase(fetchUserSignup.fulfilled, (state, action) => {
      state.isLoadingSignup = false;
      state.user = action.payload.data;
    });
    builder.addCase(fetchUserSignup.rejected, (state) => {
      state.isLoadingSignup = false;
      state.isError = true;
    });

    // Login
    builder.addCase(fetchUserLogin.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchUserLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.data;
    });
    builder.addCase(fetchUserLogin.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    // Logout
    builder.addCase(fetchUserLogout.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchUserLogout.fulfilled, (state) => {
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
