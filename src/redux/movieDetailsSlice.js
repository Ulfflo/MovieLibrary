import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Skapa en asynkron thunk för att hämta en film baserat på dess ID
export const fetchMovieById = createAsyncThunk(
  "movies/fetchMovieById",
  async (id) => {
   
    const options = {
      method: "GET",
      headers: {
        accept: "application/json", 
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`, 
      },
    };

    
    const movieResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${id}`, // URL för att hämta filminformation
      options
    );

   
    const creditsResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits`, // URL för att hämta credits (regissör och rollista)
      options
    );

   
    if (!movieResponse.ok || !creditsResponse.ok) {
      throw new Error(`HTTP error! status: ${movieResponse.status}`); 
    }

    
    const movieData = await movieResponse.json();
    const creditsData = await creditsResponse.json();

    // Returnera både filminformationen och credits som ett sammanfogat objekt
    return { ...movieData, credits: creditsData };
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


export const selectMovie = (state) => state.movieDetails.movie; // Hämta den valda filmen
export const selectLoading = (state) => state.movieDetails.loading; // Hämta laddningstillståndet
export const selectError = (state) => state.movieDetails.error; // Hämta eventuella fel

// Exportera reducer för att inkludera den i store-konfigurationen
export default movieDetailsSlice.reducer;
