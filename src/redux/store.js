import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice"; 
import movieDetailsReducer from "./movieDetailsSlice"; 
import favoritesReducer from "./favoriteSlice"; 
import ratingsReducer from "./ratingsSlice"; 
import {
  loadStateFromLocalStorage, 
  saveStateToLocalStorage, 
} from "../utils/localStorageUtils"; 

// Ladda initialt tillstånd från localStorage
const preloadedState = loadStateFromLocalStorage(); 


const store = configureStore({
  reducer: {
    movies: movieReducer, 
    movieDetails: movieDetailsReducer, 
    favorites: favoritesReducer, 
    ratings: ratingsReducer, 
  },
  preloadedState, // Förladda tillståndet med favoriter och betyg från localStorage
});

// Prenumerera på store-ändringar för att spara både favoriter och betyg i localStorage
store.subscribe(() => {
  const state = store.getState(); // Hämta hela Redux-tillståndet
  saveStateToLocalStorage(state); // Spara hela tillståndet i localStorage
});

export default store; 
