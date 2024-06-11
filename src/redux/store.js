import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice';
import menuReducer from './menuSlice';
import modalReducer from './modalSlice';
import postsReducer from './postsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    menu: menuReducer,
    modal: modalReducer,
    posts: postsReducer,
  },
});

export default store;
