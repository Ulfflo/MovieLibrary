import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import FavoritesPage from "./pages/Favorites";
import NavigationMenu from "./components/NavigationMenu";
import { Provider } from "react-redux";
import store from "./redux/store";
import TagManager from "react-gtm-module";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    TagManager.initialize({ gtmId: "GTM-P9D93L28" });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <NavigationMenu />

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
