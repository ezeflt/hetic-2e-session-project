import { createSlice } from '@reduxjs/toolkit';

interface CustomState {
    value: Boolean;
  }

// the local storage
const initialState : CustomState = {
  value: true,
};

export const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {

    open: ( state : CustomState) => {
      state.value = true;
    },
    close: ( state : CustomState ) => {
      state.value = false;
    },
    
  },
});

export const { open, close } = navbarSlice.actions;
export default navbarSlice.reducer;
