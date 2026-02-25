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
    <div className="container-fluid min-vh-100 bg-success-subtle py-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4 ">
          <h1 className="text-center flex-grow-1 m-0">Dashboard</h1>
          <button
            className="btn btn-danger ms-3"
            onClick={handleLogout}
          >
            Cerrar Sesión
          </button>
        </div>

        <AddMovie />
        <Filters />
        <MovieList />
        <Reports />

        <div className="row mt-4">
          <div className="col-md-6 mb-4">
            <ChartCategory />
          </div>
          <div className="col-md-6 mb-4">
            <ChartCalification />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
