import { createSlice } from "@reduxjs/toolkit";

const ratingsSlice = createSlice({
  name: "ratings",
  initialState: {
    ratings: {}, // Object to store ratings with movie ID as key
  },
  reducers: {
    setRating: (state, action) => {
      const { id, rating } = action.payload;
      state.ratings[id] = rating; // Set the rating for the movie with the given ID
    },
  },
});

// Export actions and reducer
export const { setRating } = ratingsSlice.actions;
export default ratingsSlice.reducer;

// Selector to get the rating for a specific movie
export const selectRating = (state, movieId) =>
  state.ratings.ratings[movieId] || 0;
