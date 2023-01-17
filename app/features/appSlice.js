import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: null,
  havePermissions: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    default: (state) => {
      return {
        ...state,
      };
    },
    setUsername: (state, userName) => {
      state.userName = userName.payload;
    },
    setHavePermissions: (state, havePermissions) => {
      state.havePermissions = havePermissions.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUsername, setHavePermissions } = appSlice.actions;

export default appSlice.reducer;
