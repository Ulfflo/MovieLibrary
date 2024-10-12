import React from "react";
import { useDispatch } from "react-redux";
import { removeFavorite } from "../redux/favoriteSlice"; // Import the action
import Button from "./Button"; // Use the Button component

const FavoritesList = ({ favorites }) => {
  const dispatch = useDispatch(); // Get the dispatch function

  // Function to handle removing a favorite movie
  const handleRemoveClick = (movie) => {
    dispatch(removeFavorite(movie)); // Dispatch the removeFavorite action
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Favourites</h2>
      {favorites.length === 0 ? (
        <p>No favourites yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.map((movie) => (
            <div
              key={movie.id}
              className="bg-white shadow-md rounded-md p-4 flex flex-col justify-between"
            >
              <h3 className="font-bold">{movie.title}</h3>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-60 sm:h-72 lg:h-[400px] object-cover"
              />
              <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-2">
                <Button
                  label="Play Film"
                  fullWidth={true}
                />
                <Button
                  label="Remove"
                  color="bg-red-500"
                  hoverColor="hover:bg-red-600"
                  fullWidth={true}
                  onClick={() => handleRemoveClick(movie)} // Attach remove handler
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList;
