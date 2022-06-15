import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import imageService from './imageService';

const initialState = {
  images: [],
  currentImage: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get images
export const getImages = createAsyncThunk(
  'images/getAll',
  async (_, thunkAPI) => {
    try {
      return await imageService.getImages();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Set current image
export const setCurrent = createAsyncThunk(
  'images/setCurrent',
  async (id, thunkAPI) => {
    try {
      return await imageService.setCurrent(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Search images
export const search = createAsyncThunk(
  'images/search',
  async (text, thunkAPI) => {
    try {
      return await imageService.search(text);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.images = action.payload;
      })
      .addCase(getImages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(setCurrent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentImage = state.images.find(
          (image) => image.id === action.payload
        );
      })
      .addCase(search.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(search.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.images = action.payload.results;
      })
      .addCase(search.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = imageSlice.actions;
export default imageSlice.reducer;
