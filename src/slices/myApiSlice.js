import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define an async action using createAsyncThunk
export const fetchData = createAsyncThunk('apiList/fetchData', async (animal='cats') => {
  try {
    const response = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${animal}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
});

const apiListSlice = createSlice({
  name: 'apiList',
  initialState: {
    data: null,
    status: 'loading',
    error: null,
  },
  reducers: {
    // Your other reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default apiListSlice.reducer;
