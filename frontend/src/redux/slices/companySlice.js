import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../utils/axios";
import { fetchRejectNotification } from "./notificationSlice";

export const fetchAllCompanies = createAsyncThunk(
  "company/getAll",
  async function () {
    try {
      const response = await API.get("company/get");
      return response.data;
    } catch (error) {
      console.log("Error while fetch All companiese : " + error.message);
    }
  }
);

export const fetchAddCompany = createAsyncThunk(
  "company/addCompany",
  async function (data) {
    try {
      const response = await API.post("company/add", data);
      return response.data;
    } catch (error) {
      console.log("Error while adding company : " + error.message);
    }
  }
);

export const fetchChangeStatus = createAsyncThunk(
  "company/status",
  async function ({ status, id }) {
    try {
      const response = await API.patch(`company/update/status/${id}`, {
        status,
      });

      return response.data;
    } catch (error) {
      console.log("Error while change status : " + error.message);
    }
  }
);

export const fetchDeleteCompany = createAsyncThunk(
  "company/delete",
  async function (id) {
    try {
      const response = await API.delete(`company/delete/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Error while delete company : " + error.message);
    }
  }
);

export const fetchStarWishlistStatus = createAsyncThunk(
  "wishlist/update",
  async function ({ id }) {
    try {
      const response = await API.patch(`company/update/star/${id}`);
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);
const companySlice = createSlice({
  name: "company",
  initialState: {
    isLoading: false,
    isError: false,
    companies: [],
  },
  extraReducers: (builder) => {
    //fetch all company
    builder.addCase(fetchAllCompanies.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllCompanies.fulfilled, (state, action) => {
      state.isLoading = false;
      state.companies = action.payload?.companies;
    });
    builder.addCase(fetchAllCompanies.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    // fetch add company
    builder.addCase(fetchAddCompany.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAddCompany.fulfilled, (state, action) => {
      state.isLoading = false;
      state.companies.push(action.payload?.data);
    });
    builder.addCase(fetchAddCompany.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    //change status
    builder.addCase(fetchChangeStatus.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchChangeStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedCompany = action.payload?.data;
      state.companies = state.companies.map((company) => {
        return company._id === updatedCompany._id ? updatedCompany : company;
      });
    });
    builder.addCase(fetchChangeStatus.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    //delete data
    builder.addCase(fetchDeleteCompany.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDeleteCompany.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedCompany = action.payload?.data;
      state.companies = state.companies.filter((company) => {
        return company._id !== updatedCompany._id;
      });
    });
    builder.addCase(fetchDeleteCompany.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    //star rating data
   
    builder.addCase(fetchStarWishlistStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedCompany = action.payload?.data;

      state.companies = state.companies.map((company) =>
        company._id === updatedCompany._id ? updatedCompany : company
      );
    });
    builder.addCase(fetchStarWishlistStatus.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    // handle reject notification
    builder.addCase(fetchRejectNotification.fulfilled, (state, action) => {
      const updatedCompany = action.payload?.data;

      state.companies = state.companies.map((company) =>
        company._id === updatedCompany._id
          ? { ...company, status: "Rejected" }
          : company
      );
    });
  },
});

export default companySlice.reducer;
