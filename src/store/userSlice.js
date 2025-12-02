import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accountsGoalUser: localStorage.getItem("accountsGoalUser")
    ? JSON.parse(localStorage.getItem("accountsGoalUser"))
    : null,
  loginTime: localStorage.getItem("accountsGoalUserLoginTime")
    ? localStorage.getItem("accountsGoalUserLoginTime")
    : "",
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.accountsGoalUser = action.payload;
      localStorage.setItem("accountsGoalUser", JSON.stringify(action.payload));
    },
    setLoginTime: (state, action) => {
      state.loginTime = new Date().getTime();
      localStorage.setItem("accountsGoalUserLoginTime", new Date().getTime());
    },
    logoutUser: (state, action) => {
      state.accountsGoalUser = null;
      state.loginTime = "";
      localStorage.clear();
    },
  },
});

export const { setCredentials, logoutUser, setLoginTime } = userSlice.actions;

export default userSlice.reducer;
