import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  authToken: null,
  userInfo: {},
  refreshToken: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateIsAuthenticated: (state, actions) => {
      state.isAuthenticated = actions.payload;
    },
  },
});

export const {updateIsAuthenticated} = authSlice.actions;

export default authSlice.reducer;
