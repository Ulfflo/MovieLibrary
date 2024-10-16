import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPopularMovies, 
  selectMovies, 
  selectLoading, 
  selectError, 
  searchMovies, 
} from "../redux/movieSlice";
import SearchBar from "../components/SearchBar"; 
import MovieList from "../components/MovieList"; 


const HomePage = () => {
  const dispatch = useDispatch(); 
  const movies = useSelector(selectMovies); 
  const loading = useSelector(selectLoading); 
  const error = useSelector(selectError); 


  useEffect(() => {
    dispatch(fetchPopularMovies()); // Skickar åtgärden för att hämta populära filmer
  }, [dispatch]); // useEffect körs om dispatch förändras

  // Debounce-funktion för att fördröja sökningar så att de inte sker för ofta
  const debouncedSearchMovies = debounce((query) => {
    if (query) {
      dispatch(searchMovies(query)); // Om det finns en sökfråga, sök efter filmer
    } else {
      dispatch(fetchPopularMovies()); // Om sökfrågan är tom, hämta populära filmer igen
    }
  }, 300); // Fördröjning på 300 ms

  return (
   
    <div className="container mx-auto">
      
      <SearchBar onSearch={debouncedSearchMovies} />
    
      {loading && <p>Loading...</p>}
   
      {error && <p>Error: {error}</p>}
   
      <MovieList movies={movies} />
    </div>
  );
};

// Debounce-funktion som gör att en funktion inte anropas för ofta (fördröjer anropet)
const debounce = (func, delay) => {
  let timeoutId; // Sparar timeout-id
  return function (...args) {
    if (timeoutId) clearTimeout(timeoutId); // Om det redan finns en timeout, avbryt den
    timeoutId = setTimeout(() => {
      func.apply(null, args); // Kör funktionen efter fördröjningen
    }, delay);
  };
};

export default HomePage;
