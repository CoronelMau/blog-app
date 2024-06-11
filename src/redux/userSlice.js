import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: null,
  email: null,
  password: null,
  url: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { username, email, password, url } = action.payload;
      state.username = username;
      state.email = email;
      state.password = password;
      state.url = url;
    },
  },
});

export const { addUser, changeEmail, changeName, changePassword, changeUrl } =
  userSlice.actions;
export default userSlice.reducer;
