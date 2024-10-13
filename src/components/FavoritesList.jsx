import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFavorite } from "../redux/favoriteSlice";
import { setRating, selectRating } from "../redux/ratingsSlice"; // Import rating actions and selector
import Button from "./Button";
import Rating from "./Rating";

const FavoritesList = ({ favorites }) => {
  const dispatch = useDispatch();

  const handleRemoveClick = (movie) => {
    dispatch(removeFavorite(movie));
  };

  const handleRatingChange = (movie, rating) => {
    dispatch(setRating({ id: movie.id, rating }));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Favourites</h2>
      {favorites.length === 0 ? (
        <p>No favourites yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.map((movie) => (
            <FavoriteItem
              key={movie.id}
              movie={movie}
              handleRemoveClick={handleRemoveClick}
              handleRatingChange={handleRatingChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Separate component for each favorite item
const FavoriteItem = ({ movie, handleRemoveClick, handleRatingChange }) => {
  const dispatch = useDispatch();
  const rating = useSelector((state) => selectRating(state, movie.id)); // Get the rating from ratingsSlice

  return (
    <div className="bg-white shadow-md rounded-md p-4 flex flex-col justify-between">
      <h3 className="font-bold">{movie.title}</h3>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-60 sm:h-72 lg:h-[400px] object-cover"
      />
      <div className="mt-4">
        {/* Star rating system */}
        <Rating
          rating={rating}
          onRatingChange={(newRating) => handleRatingChange(movie, newRating)}
        />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <Button label="Play Film" fullWidth={true} />
          <Button
            label="Remove"
            color="bg-red-500"
            hoverColor="hover:bg-red-600"
            fullWidth={true}
            onClick={() => handleRemoveClick(movie)}
          />
        </div>
      </div>
    </div>
  );
};

export default FavoritesList;
