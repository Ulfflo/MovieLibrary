import React from "react";
import { useDispatch } from "react-redux";
import { removeFavorite } from "../redux/favoriteSlice";
import { setRating } from "../redux/ratingsSlice";
import FavoriteItem from "./FavoriteItem";


const FavoritesList = ({ favorites }) => {
  const dispatch = useDispatch(); 

  
  const handleRemoveClick = (movie) => {
    dispatch(removeFavorite(movie)); // Anropa Redux för att ta bort en film från favoriter
  };

  
  const handleRatingChange = (movie, rating) => {
    dispatch(setRating({ id: movie.id, rating })); // Anropa Redux för att uppdatera betyget för en film
  };

  return (
 
    <div className="p-4">
  
      <h2 className="text-xl font-bold mb-4">My Favourites</h2>

      {favorites.length === 0 ? (
        // Om inga favoriter finns, visa ett meddelande
        <p>No favourites yet.</p>
      ) : (
        // Om favoriter finns, visa dem i ett rutnät
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.map((movie) => (
            // Skapa en FavoriteItem-komponent för varje favoritfilm
            <FavoriteItem
              key={movie.id} // Nyckel baserad på filmens id för att unikt identifiera varje element
              movie={movie} // Skicka vidare filmen som prop
              handleRemoveClick={handleRemoveClick} // Skicka vidare borttagningsfunktionen som prop
              handleRatingChange={handleRatingChange} // Skicka vidare funktionen för betygsändring som prop
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList;
