import { createSlice } from "@reduxjs/toolkit";

// we must add || [] cus if we dont have favorites in local storage we cant spread favoritesFromLocalStorage
const favoritesFromLocalStorage =
  JSON.parse(localStorage.getItem("favorites")) || [];
const favoriteSlice = createSlice({
  name: "favorite",
  initialState: { favorite: [...favoritesFromLocalStorage] },
  reducers: {
    addFavorite: function (state, action) {
      // state.favorite = action.payload;
      // state.favorite.push(action.payload);
      state.favorite = [...state.favorite, action.payload];
      console.log(state.favorite);
      localStorage.setItem("favorites", JSON.stringify(state.favorite));
    },
    removeFavorite: function (state, action) {
      state.favorite = state.favorite.filter(
        (movie) => movie.id != action.payload
      );
      console.log(state.favorite);
      localStorage.setItem("favorites", JSON.stringify(state.favorite));
    },
  },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
