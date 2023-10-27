// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import myApiSliceReducer from './slices/myApiSlice';

const store = configureStore({
  reducer: {
    myApi: myApiSliceReducer,
  },
});

export default store;
