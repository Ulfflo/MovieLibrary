import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addFavorite: (state, action) => {
      if (!Array.isArray(state.items)) {
        state.items = [];
      }
      state.items.push(action.payload);

      // Push event to dataLayer for GTM
      if (window && window.dataLayer) {
        window.dataLayer.push({
          event: "add_to_favorite", // Custom event name for GTM
          favoriteItem: {
            id: action.payload.id,
            title: action.payload.title, // Include any additional data you want
          },
        });
      }
    },
    removeFavorite: (state, action) => {
      if (!Array.isArray(state.items)) {
        state.items = [];
      }
      state.items = state.items.filter((item) => item.id !== action.payload.id);

      // Push event to dataLayer for GTM
      if (window && window.dataLayer) {
        window.dataLayer.push({
          event: "remove_from_favorite", // Custom event name for GTM
          favoriteItem: {
            id: action.payload.id,
            title: action.payload.title, // Include any additional data you want
          },
        });
      }
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;

export const selectFavorites = (state) => state.favorites.items;
