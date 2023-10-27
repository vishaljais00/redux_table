import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define an async action using createAsyncThunk
export const fetchCatData = createAsyncThunk('catList/fetchCatData', async (url='https://api.publicapis.org/categories') => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
});



const CatSlice = createSlice({
  name: 'catList',
  initialState: {
    data: {
      categories: []
    },
    status: 'loading',
    error: null,
  },
  reducers: {
    // Your other reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCatData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchCatData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default CatSlice.reducer;
