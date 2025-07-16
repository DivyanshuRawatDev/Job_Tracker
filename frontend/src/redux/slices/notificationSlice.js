import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../utils/axios";

export const fetchNotifications = createAsyncThunk(
  "get/notification",
  async function () {
    try {
      const result = await API.get("notification");
      return result.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const fetchClearSingleNotification = createAsyncThunk(
  "followup/notification",
  async function ({ companyID }) {
    try {
      const result = await API.patch(`notification/clear/${companyID}`);
      return result.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const fetchRejectNotification = createAsyncThunk(
  "reject/notification",
  async function ({ companyID }) {
    try {
      const result = await API.patch(`notification/reject/${companyID}`);
      return result.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);


const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    items: [],
    isLoading: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload?.data || [];
      })
      .addCase(fetchNotifications.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });

    // clearSingleNotification

    builder
      .addCase(fetchClearSingleNotification.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchClearSingleNotification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter((item) => {
          return item._id !== action.payload?.data._id;
        });
      })
      .addCase(fetchClearSingleNotification.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });

      // rejectNotification

    builder
    .addCase(fetchRejectNotification.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    })
    .addCase(fetchRejectNotification.fulfilled, (state, action) => {
      state.isLoading = false;
      state.items = state.items.filter((item) => {
        return item._id !== action.payload?.data._id;
      });
    })
    .addCase(fetchRejectNotification.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default notificationSlice.reducer;
