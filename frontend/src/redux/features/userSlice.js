import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserInfo: (state, action) => {
      state.value = action.payload;
    },
    selectedChat: (state, action) => {
      state.value = action.payload;
    },
    userChats: (state, action) => {
      state.value = action.payload
    }
  },
});

export const { getUserInfo, selectedChat } = userSlice.actions;

export default userSlice.reducer;
