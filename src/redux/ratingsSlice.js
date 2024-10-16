import { createSlice } from "@reduxjs/toolkit";

const ratingsSlice = createSlice({
  name: "ratings", 
  initialState: {
    ratings: {}, 
  },
  reducers: {
    
    setRating: (state, action) => {
      const { id, rating } = action.payload; // Hämta film-ID och betyg från payload
      state.ratings[id] = rating; // Sätt betyget för filmen med det angivna ID:t, "update" operation
    },
  },
});


export const { setRating } = ratingsSlice.actions; 
export default ratingsSlice.reducer; 

// Selector för att hämta betyget för en specifik film
export const selectRating = (state, movieId) =>
// Returnera betyget för filmen, eller 0 om inget betyg finns, "read" operation
  state.ratings.ratings[movieId] || 0; 

