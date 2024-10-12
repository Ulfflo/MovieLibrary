import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movies/${movie.id}`} className="block">
      <div className="bg-white shadow-md rounded-t-md overflow-hidden flex flex-col h-full">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Use poster_path for the image
          alt={movie.title}
          className="w-full h-60 sm:h-72 lg:h-[400px] object-cover"
        />
      </div>
    </Link>
  );
};

export default MovieCard;
