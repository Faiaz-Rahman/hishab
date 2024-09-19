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
  reducers: {},
});

// export const {setUserAsGuest, setUserData, setCategoryListData, clearUserData} =
//   authSlice.actions;
export default authSlice.reducer;
