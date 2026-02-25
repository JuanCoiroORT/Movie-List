import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../auth/authSlice";

import AddMovie from "./AddMovie";
import MovieList from "./MovieList";
import Filters from "./Filters";
import Reports from "./Reports";
import ChartCategory from "./ChartCategory";
import ChartCalification from "./ChartCalification";
import { fetchMovies, fetchCategories } from "../movies/movieSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchMovies());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <AddMovie />
      <Filters />
      <MovieList />
      <Reports />
      <ChartCategory />
      <ChartCalification />
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
}

export default Dashboard;
