import { createSlice } from "@reduxjs/toolkit";
export interface IAuthTokenSlice {
  token: string
}

const initialState: IAuthTokenSlice = {
  token: ""
}

const AuthTokenSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    resetToken(state) {
      state.token = initialState.token
    }
  }
});

export const { setToken, resetToken } = AuthTokenSlice.actions;
export default AuthTokenSlice.reducer;