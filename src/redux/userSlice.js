import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
    otherUsers: [],
    onlineUsers: [],
    selectedUser: null, // ✅ Added selectedUser
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setOtherUsers: (state, action) => {
      console.log("Setting otherUsers in Redux:", action.payload);
      state.otherUsers = action.payload || [];
    },
    setOnlineUsers: (state, action) => {
      console.log("Setting online users in Redux:", action.payload);
      state.onlineUsers = action.payload || [];
    },
    setSelectedUser: (state, action) => {
      console.log("User selected:", action.payload);
      state.selectedUser = action.payload;
    },
    logoutUser: (state) => {
      state.authUser = null;
      state.otherUsers = [];
      state.onlineUsers = [];
      state.selectedUser = null;
    },
  },
});

export const { setAuthUser, setOtherUsers, setOnlineUsers, setSelectedUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
