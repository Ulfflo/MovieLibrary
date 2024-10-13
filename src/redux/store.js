import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";
import movieDetailsReducer from "./movieDetailsSlice";
import favoritesReducer from "./favoriteSlice";
import ratingsReducer from "./ratingsSlice"; // Import the ratings slice
import {
  loadStateFromLocalStorage,
  saveStateToLocalStorage,
} from "../utils/localStorageUtils"; // Import localStorage utils

// Load the initial state from localStorage
const preloadedState = loadStateFromLocalStorage(); // Load the entire state

// Configure the store with all reducers and the preloaded state
const store = configureStore({
  reducer: {
    movies: movieReducer,
    movieDetails: movieDetailsReducer,
    favorites: favoritesReducer,
    ratings: ratingsReducer,
  },
  preloadedState, // Preload the state with favorites and ratings from localStorage
});

// Subscribe to store changes to persist both favorites and ratings to localStorage
store.subscribe(() => {
  const state = store.getState(); // Get the entire Redux state
  saveStateToLocalStorage(state); // Save the entire state to localStorage
});

export default store;
