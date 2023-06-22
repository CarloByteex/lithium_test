import { createSlice } from "@reduxjs/toolkit";

export interface IAuth {
  id: number
  name: string
  email: string
}

export interface IAuthSlice {
  auth: IAuth
  message: string
}

const initialState: IAuthSlice = {
  auth: {
    id: 0,
    name: "",
    email: "",
  },
  message : ""
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
    },
    setMessage(state, action) {
      state.message = action.payload;
    }
  }
});

export const { setAuth, reset, setMessage } = AuthSlice.actions;
export default AuthSlice.reducer;