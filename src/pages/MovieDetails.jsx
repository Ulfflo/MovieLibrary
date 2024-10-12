import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchMovieById,
  selectMovie,
  selectLoading,
  selectError,
} from "../redux/movieDetailsSlice";
import {
  addFavorite,
  removeFavorite,
  selectFavorites,
} from "../redux/favoriteSlice";
import Button from "../components/Button"; // Import the Button component

const MovieDetails = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const dispatch = useDispatch();
  const movie = useSelector(selectMovie);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const favorites = useSelector(selectFavorites);

  // Fetch movie details when component mounts
  useEffect(() => {
    if (id) {
      dispatch(fetchMovieById(id));
    }
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Ensure movie object is loaded before accessing its properties
  if (!movie) return null;

  // Extract director from crew
  const director = movie?.credits?.crew?.find(
    (member) => member.job === "Director"
  );

  // Extract top 5 actors from cast
  const topActors = movie?.credits?.cast?.slice(0, 5);

  // Check if the movie is in favorites
  const isFavorite =
    movie && favorites.some((favMovie) => favMovie.id === movie.id);

  // Handle adding/removing favorites
  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFavorite(movie)); // If it's a favorite, remove it
    } else {
      dispatch(addFavorite(movie)); // If it's not, add it
    }
  };

  return (
    <div className="container mx-auto p-4">
      {movie && (
        <div className="flex flex-col sm:flex-row items-start">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full sm:w-1/3"
          />
          <div className="sm:ml-6 mt-4 sm:mt-0">
            <h1 className="text-3xl font-bold">{movie.title}</h1>
            <p className="text-gray-500">{movie.release_date}</p>
            <p className="mt-4">{movie.overview}</p>

            {/* Display director */}
            {director && (
              <p className="mt-4">
                <strong>Director: </strong>
                {director.name}
              </p>
            )}

            {/* Display top actors */}
            {topActors && (
              <div className="mt-4">
                <strong>Cast:</strong>
                <ul className="list-disc ml-6">
                  {topActors.map((actor) => (
                    <li key={actor.id}>
                      {actor.name} as {actor.character}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Play Film Button */}
            <Button label="Play film" />

            {/* Toggle button based on favorite status */}
            <Button
              label={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              color={isFavorite ? "bg-red-500" : "bg-green-500"}
              hoverColor={
                isFavorite ? "hover:bg-red-600" : "hover:bg-green-600"
              }
              onClick={handleFavoriteClick} // onClick to toggle favorites
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
