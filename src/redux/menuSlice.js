import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openMenu: false,
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    changeMenu: (state, action) => {
      state.openMenu = action.payload;
    },
  },
});

export const { changeMenu } = menuSlice.actions;
export default menuSlice.reducer;
