
import { configureStore } from '@reduxjs/toolkit'
import wishlistReducer from './Slices/wishlist'

export const store = configureStore({
  reducer: {
     wishlist: wishlistReducer,
 },
})