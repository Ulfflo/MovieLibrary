import { Link } from "react-router-dom";

const NavigationMenu = () => {
  return (
    <nav className="bg-blue-800 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-white font-bold text-lg">Movie Library</h1>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:underline">
            Home
          </Link>
          <Link to="/favorites" className="text-white hover:underline">
            Favourites
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavigationMenu;
