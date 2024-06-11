import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openModal: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    changeModal: (state, action) => {
      state.openModal = action.payload;
    },
  },
});

export const { changeModal } = modalSlice.actions;
export default modalSlice.reducer;
