import { useSelector } from "react-redux"; // Redux för att hämta favoriter
import FavoritesList from "../components/FavoritesList";

const FavoritesPage = () => {
  // Hämta favoriter från Redux state
  const favorites = useSelector((state) => state.favorites.items);

  return (
    <div className="container mx-auto p-4">
      <FavoritesList favorites={favorites} />
    </div>
  );
};

export default FavoritesPage;
