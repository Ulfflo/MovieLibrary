// store.js
import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";
import movieDetailsReducer from "./movieDetailsSlice";
import favoritesReducer from "./favoriteSlice";
import {
  loadStateFromLocalStorage,
  saveStateToLocalStorage,
} from "../utils/localStorageUtils"; // Import localStorage utils

// Load the initial state from localStorage for favorites (if any)
const preloadedState = {
  favorites: loadStateFromLocalStorage(), // Load favorites from local storage
};

// Configure the store with all reducers and initial state for favorites
const store = configureStore({
  reducer: {
    movies: movieReducer,
    movieDetails: movieDetailsReducer,
    favorites: favoritesReducer,
  },
  preloadedState, // Preload the state with favorites from localStorage
});

// Subscribe to store changes to persist favorites slice to localStorage
store.subscribe(() => {
  const { favorites } = store.getState(); // Get the favorites slice from state
  saveStateToLocalStorage(favorites); // Save favorites to localStorage
});

export default store;
