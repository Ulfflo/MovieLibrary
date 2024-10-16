import React from "react";
import { useSelector } from "react-redux";
import { selectRating } from "../redux/ratingsSlice";
import Button from "./Button";
import Rating from "./Rating";


const FavoriteItem = ({ movie, handleRemoveClick, handleRatingChange }) => {
  // Använder useSelector för att hämta betyget för den specifika filmen från Redux-store
  const rating = useSelector((state) => selectRating(state, movie.id));

  return (
  
    <div className="bg-white shadow-md rounded-md p-4 flex flex-col justify-between">
 
      <h3 className="font-bold">{movie.title}</h3>

     
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-60 sm:h-72 lg:h-[400px] object-cover"
      />

      
      <div className="mt-4">
        {/* Betygskomponent med betyget och en callback när betyget ändras */}
        <Rating
          rating={rating}
          onRatingChange={(newRating) => handleRatingChange(movie, newRating)}
        />
       
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          {/* Knapp för att spela filmen, med full bredd på mobiler */}
          <Button label="Play Film" fullWidth={true} />

          {/* Knapp för att ta bort filmen från favoriterna */}
          <Button
            label="Remove"
            color="bg-red-500"
            hoverColor="hover:bg-red-600"
            fullWidth={true}
            onClick={() => handleRemoveClick(movie)} // Anropar funktionen när man klickar
          />
        </div>
      </div>
    </div>
  );
};

export default FavoriteItem;
