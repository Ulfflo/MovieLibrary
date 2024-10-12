import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addFavorite: (state, action) => {
      // Ensure state.items is always an array
      if (!Array.isArray(state.items)) {
        state.items = [];
      }
      state.items.push(action.payload); // Add movie to favorites
    },
    removeFavorite: (state, action) => {
      // Ensure state.items is an array before using filter
      if (!Array.isArray(state.items)) {
        state.items = [];
      }
      state.items = state.items.filter((item) => item.id !== action.payload.id); // Remove movie from favorites
    },
  },
});

// Export actions and reducer
export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;

// Selector to get favorites items
export const selectFavorites = (state) => state.favorites.items;
