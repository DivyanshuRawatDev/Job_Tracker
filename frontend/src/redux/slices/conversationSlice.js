import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../utils/axios";

export const fetchAllUsersWithoutCurrentUser = createAsyncThunk(
  "conversation/allUsers",
  async function () {
    try {
      const response = await API.get("get-users");
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const fetchSendMessage = createAsyncThunk("conversation/message",async function({senderID,receiverID,message,roomID}){
    try {
        const response = await API.post("message",{senderID,receiverID,message,roomID});
        return response.data;
    } catch (error) {
        console.log(error);
    }
})

const conversationSlice = createSlice({
  name: "conversation",
  initialState: {
    isLoading: false,
    isError: false,
    allUsersWithoutCurrentUser: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsersWithoutCurrentUser.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(
      fetchAllUsersWithoutCurrentUser.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.allUsersWithoutCurrentUser = action.payload?.data;
      }
    );

    builder.addCase(fetchAllUsersWithoutCurrentUser.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    //send message
    

  },
});

export default conversationSlice.reducer;
