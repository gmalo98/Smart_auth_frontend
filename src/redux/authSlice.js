// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// 🛠 Safely load from localStorage
let savedUser = null;
try {
  const storedUser = localStorage.getItem('user');
  if (storedUser && storedUser !== 'undefined') {
    savedUser = JSON.parse(storedUser);
  }
} catch (error) {
  console.error('Failed to parse user from localStorage:', error);
}

const initialState = {
  user: savedUser,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
     
      localStorage.removeItem('user');
       state.user = null;
    },
  },
});

export const { setAuthUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
