import { createSlice } from "@reduxjs/toolkit";

export interface IAuth {
  id: number
  name: string
  email: string
}

export interface IAuthSlice {
  auth: IAuth
}

const initialState: IAuthSlice = {
  auth: {
    id: 0,
    name: "",
    email: "",
  },
}

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action) {
      state.auth = action.payload;
    },
    reset(state) {
      state.auth = initialState.auth
    }
  }
});

export const { setAuth, reset } = AuthSlice.actions;
export default AuthSlice.reducer;