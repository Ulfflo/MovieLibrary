import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Skapa en async thunk för att hämta filmdata
export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopular",
  async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOWEzYmM1YTQ5MzFlYjA0ZDVlMjA5ODEwMzRiMDVjOSIsIm5iZiI6MTcyODM3OTUxMi45Mzk1NTcsInN1YiI6IjY3MDRkN2MwNWMwMGEyZDQ0ZWMwMDgwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qLp5JPdCrw9SQMZElEecH13adx0Uq4nfYf9Qc7fKOkQ",
      },
    };

    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options
    );

    // Check if response is okay
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.results; // Return the results
  }
);

// Skapa en async thunk för att söka filmer
export const searchMovies = createAsyncThunk(
  "movies/searchMovies",
  async (query) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOWEzYmM1YTQ5MzFlYjA0ZDVlMjA5ODEwMzRiMDVjOSIsIm5iZiI6MTcyODM3OTUxMi45Mzk1NTcsInN1YiI6IjY3MDRkN2MwNWMwMGEyZDQ0ZWMwMDgwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qLp5JPdCrw9SQMZElEecH13adx0Uq4nfYf9Qc7fKOkQ",
      },
    };

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        query
      )}`,
      options
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
  }
);



// Skapa en slice
const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [], 
   
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
  builder
    .addCase(fetchPopularMovies.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchPopularMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.movies = action.payload; // spara filmer i state
    })
    .addCase(fetchPopularMovies.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message; // hantera felet
    })
    // Add cases for searchMovies
    .addCase(searchMovies.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(searchMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.movies = action.payload; // spara sökresultat i state
    })
    .addCase(searchMovies.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message; // hantera felet
  
      });
       
  },
});

// Exportera movie-slice

export const selectMovies = (state) => state.movies.movies;
export const selectLoading = (state) => state.movies.loading;
export const selectError = (state) => state.movies.error;

export default movieSlice.reducer;
