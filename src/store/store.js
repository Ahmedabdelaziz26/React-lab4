import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "./slices/favorite";
import loaderReducer from "./slices/loader";

const store = configureStore({
  reducer: {
    favorite: favoriteReducer,
    loader: loaderReducer,
  },
});

export default store;
