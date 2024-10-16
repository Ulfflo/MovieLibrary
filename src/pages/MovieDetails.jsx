import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"; // Hook för att fånga upp id från URL:en
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
import { setRating, selectRating } from "../redux/ratingsSlice"; 
import Button from "../components/Button"; 
import Rating from "../components/Rating"; 


const MovieDetails = () => {
  const { id } = useParams(); // Hämta filmens id från URL:en
  const dispatch = useDispatch(); 
  const movie = useSelector(selectMovie); 
  const loading = useSelector(selectLoading); 
  const error = useSelector(selectError); 
  const favorites = useSelector(selectFavorites); // Hämta användarens favoritfilmer från Redux-store
  const rating = useSelector((state) => selectRating(state, id)); // Hämta användarens betyg för denna film

 
  useEffect(() => {
    if (id) {
      dispatch(fetchMovieById(id)); // Anropa funktionen för att hämta filmens detaljer
    }
  }, [dispatch, id]); // Körs när dispatch eller id förändras

  if (loading) return <p>Loading...</p>; 
  if (error) return <p>Error: {error}</p>; 
  if (!movie) return null; 

  // Hämta regissören 
  const director = movie?.credits?.crew?.find(
    (member) => member.job === "Director"
  );

  // Hämta de fem första skådespelarna 
  const topActors = movie?.credits?.cast?.slice(0, 5);

  // Kontrollera om filmen redan är en favorit
  const isFavorite = favorites.some((favMovie) => favMovie.id === movie.id);

  // Funktion för att hantera klick på "Add to/remove from favourites"-knappen
  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFavorite(movie)); // Om filmen är en favorit, ta bort den
    } else {
      dispatch(addFavorite(movie)); // Om filmen inte är en favorit, lägg till den
    }
  };

  // Funktion för att hantera betygsändringar
  const handleRatingChange = (newRating) => {
    dispatch(setRating({ id: movie.id, rating: newRating })); // Uppdatera betyget för filmen
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
          
            {director && (
              <p className="mt-4">
                <strong>Director: </strong>
                {director.name}
              </p>
            )}
           
            {topActors && (
              <div className="mt-4">
                <strong>Cast:</strong>
                <ul className="list-disc ml-6">
                  {topActors.map((actor) => (
                    <li key={actor.id}>
                      {actor.name} as {actor.character}{" "}
                     
                    </li>
                  ))}
                </ul>
              </div>
            )}
           
            <div className="mt-4">
              <Rating rating={rating} onRatingChange={handleRatingChange} />
            </div>
          
            <div className="flex items-center mt-8 gap-2">
              <Button label="Play film" />
              <Button
                label={
                  isFavorite ? "Remove from Favourites" : "Add to Favourites"
                }
                color={isFavorite ? "bg-red-500" : "bg-green-500"}
                hoverColor={
                  isFavorite ? "hover:bg-red-600" : "hover:bg-green-600"
                }
                onClick={handleFavoriteClick} // Hantera klick på favoritknappen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
