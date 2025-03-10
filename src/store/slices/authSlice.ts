import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';

interface UserType {
  email: string | null;
  photoUrl: null | string;
  displayName: string | null;
  uid: string;
}

interface StateType {
  isAuthenticated: boolean;
  authToken: string | null;
  authLoader: boolean;
  userInfo: UserType;
  refreshToken: string;
}

const initialState: StateType = {
  isAuthenticated: false,
  authToken: null,
  authLoader: false,
  userInfo: {
    displayName: null,
    email: '',
    photoUrl: null,
    uid: '',
  },
  refreshToken: '',
};

export const login = createAsyncThunk(
  'auth/login',
  async ({email, password}: {email: string; password: string}, thunkAPI) => {
    try {
      const response = await auth().signInWithEmailAndPassword(email, password);
      console.log('reponse from thunk =>', response);
      return response.user;
    } catch (error) {
      console.log('error in thunk =>', error);
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message.slice(26));
      } else {
        return thunkAPI.rejectWithValue('Error occurred in login');
      }
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateIsAuthenticated: (state, actions) => {
      state.isAuthenticated = actions.payload;
    },
    updateAuthLoader: (state, actions) => {
      state.authLoader = actions.payload;
    },
    logout: (state, actions) => {
      state = initialState;
    },
  },
  extraReducers(builder) {
    builder.addCase(login.pending, (state, action) => {
      state.authLoader = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.authLoader = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      if (action?.payload) {
        state.userInfo.displayName = action.payload.displayName;
        state.userInfo.email = action.payload.email;
        state.userInfo.photoUrl = action.payload.photoURL;
        state.userInfo.uid = action.payload.uid;

        state.isAuthenticated = true;
      }
    });
  },
});

export const {updateIsAuthenticated, updateAuthLoader, logout} =
  authSlice.actions;

export default authSlice.reducer;
