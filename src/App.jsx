import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import FavoritesPage from "./pages/Favorites";
import NavigationMenu from "./components/NavigationMenu";
import { Provider } from 'react-redux'; // Import the Provider
import store from './redux/store'; // Import the store

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          {/* NavigationMenu will be visible on all pages */}
          <NavigationMenu />

          {/* Defining the routes */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
