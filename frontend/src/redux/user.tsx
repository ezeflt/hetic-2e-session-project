import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CustomState {
    value: Object;
  }

interface User {
    _id: string;
    username: string;
    email: String;
    password: String;
    token: String;
    role: String;
    guides: Array<any>;
    courses: Array<any>;
}

// the local storage
const initialState : CustomState = {
  value: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    login: ( state : CustomState, action : PayloadAction<User>) => {
      state.value = action.payload;
    },
    logout: ( state : CustomState ) => {
      state.value = {};
    },
    
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
