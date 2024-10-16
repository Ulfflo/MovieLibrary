import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopular", 
  async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json", // Acceptera JSON-format för svaret
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`, 
      },
    };

   
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", // API-endpoint för populära filmer
      options
    );

    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`); 
    }

    const data = await response.json();
    return data.results; 
  }
);


export const searchMovies = createAsyncThunk(
  "movies/searchMovies", 
  async (query) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json", // Acceptera JSON-format för svaret
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`, 
      },
    };

    // Hämta sökresultat från TMDb API baserat på användarens sökfråga
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
        state.movies = action.payload; 
      })
     
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false; 
        state.error = action.error.message;
      })
      
      .addCase(searchMovies.pending, (state) => {
        state.loading = true; 
        state.error = null; 
      })
    
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload; 
      })
     
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; 
      });
  },
});


export const selectMovies = (state) => state.movies.movies; // Hämta filmer från state
export const selectLoading = (state) => state.movies.loading; // Hämta laddningstillstånd
export const selectError = (state) => state.movies.error; // Hämta eventuella fel

// Exportera movieSlice-reducer för att inkludera den i store-konfigurationen
export default movieSlice.reducer;
