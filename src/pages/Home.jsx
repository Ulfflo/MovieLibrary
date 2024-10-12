import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPopularMovies,
  selectMovies,
  selectLoading,
  selectError,
  searchMovies, // Import the searchMovies thunk
} from "../redux/movieSlice";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";


const HomePage = () => {
  const dispatch = useDispatch();
  const movies = useSelector(selectMovies);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  // Fetch popular movies when the component mounts
  useEffect(() => {
    dispatch(fetchPopularMovies()); // Dispatch the thunk to fetch movies
  }, [dispatch]);

  // Debounced search function
  const debouncedSearchMovies = debounce((query) => {
    if (query) {
      dispatch(searchMovies(query)); // Call the thunk to search for movies
    } else {
      dispatch(fetchPopularMovies()); // Fetch popular movies if query is empty
    }
  }, 300); // 300ms delay for debouncing

  return (
    

      <div className="container mx-auto">
        <SearchBar onSearch={debouncedSearchMovies} />
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <MovieList movies={movies} />
      </div>
  )
};

// Debounce function
const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

export default HomePage;
