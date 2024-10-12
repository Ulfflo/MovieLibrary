import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Add fetchMovieById async thunk
export const fetchMovieById = createAsyncThunk(
  "movies/fetchMovieById",
  async (id) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOWEzYmM1YTQ5MzFlYjA0ZDVlMjA5ODEwMzRiMDVjOSIsIm5iZiI6MTcyODM3OTUxMi45Mzk1NTcsInN1YiI6IjY3MDRkN2MwNWMwMGEyZDQ0ZWMwMDgwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qLp5JPdCrw9SQMZElEecH13adx0Uq4nfYf9Qc7fKOkQ",
      },
    };

    // Fetch movie details
    const movieResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${id}`,
      options
    );

    // Fetch credits (for director and cast)
    const creditsResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits`,
      options
    );

    if (!movieResponse.ok || !creditsResponse.ok) {
      throw new Error(`HTTP error! status: ${movieResponse.status}`);
    }

    const movieData = await movieResponse.json();
    const creditsData = await creditsResponse.json();

    return { ...movieData, credits: creditsData }; // Return both movie data and credits
  }
);

const movieDetailsSlice = createSlice({
  name: "movieDetails",
  initialState: {
    movie: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.loading = false;
        state.movie = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectMovie = (state) => state.movieDetails.movie;
export const selectLoading = (state) => state.movieDetails.loading;
export const selectError = (state) => state.movieDetails.error;

export default movieDetailsSlice.reducer;
