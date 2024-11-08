import { createSlice } from '@reduxjs/toolkit';

interface CustomState {
    value: Boolean;
  }

// the local storage
const initialState : CustomState = {
  value: true,
};

export const popupSlice = createSlice({
  name: 'popup',
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

export const { open, close } = popupSlice.actions;
export default popupSlice.reducer;
