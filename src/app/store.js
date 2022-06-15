import { configureStore } from '@reduxjs/toolkit';

import imageReducer from 'features/images/imageSlice';

export const store = configureStore({
  reducer: {
    images: imageReducer,
  },
});
