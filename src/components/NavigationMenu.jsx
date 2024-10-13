import { Link } from "react-router-dom";

const NavigationMenu = () => {
  return (
    <nav className="flex justify-between items-center text-white bg-blue-800 p-4">
      <div className="flex items-center">
        {/* <img src="/Marlon.jpg" alt="logo" width={80} height={50} /> */}
        <h1 className="ml-2 text-2xl font-bold">The Movie Library</h1>
      </div>

      <div className="flex justify-between p-4 items-center">
        <Link to="/"className="text-white pr-4 hover:underline">Home</Link>
        <Link to="/favorites" className="text-white hover:underline">
          Favourites
        </Link>
      </div>
    </nav>
  );
};

export default NavigationMenu;
