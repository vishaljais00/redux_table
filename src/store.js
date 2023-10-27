// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import myApiSliceReducer from './slices/myApiSlice';
import categorySliceReducer from './slices/categorySlice';

const store = configureStore({
  reducer: {
    myApi: myApiSliceReducer,
    catApi: categorySliceReducer,
  },
});

export default store;
