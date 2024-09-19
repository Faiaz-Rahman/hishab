import {combineReducers} from '@reduxjs/toolkit';

import authReducer from '@store/slices/authSlice';
import {configureStore} from '@reduxjs/toolkit';

import {persistStore, persistReducer} from 'redux-persist';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';

export const rootReducer = combineReducers({
  auth: authReducer,
});

// import {
//   FLUSH,
//   PAUSE,
//   PURGE,
//   PERSIST,
//   REGISTER,
//   REHYDRATE,
//   persistStore,
//   persistReducer,
// } from 'redux-persist';

// import authSlice from '../slices/authSlice';

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = createStore(persistedReducer);

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
