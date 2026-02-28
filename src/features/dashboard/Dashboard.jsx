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

import "../../styles/dashboard.css";

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
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        <header className="dashboard-header">
          <h1>Dashboard</h1>

          <button className="dashboard-logout" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </header>

        {/* Agregar película */}
        <section className="dashboard-block">
          <AddMovie />
        </section>
        
        {/* Filtro + Lista */}
        <section className="dashboard-main dashboard-card">
          <div className="dashboard-sidebar">
            <Filters />
          </div>

          <div className="dashboard-content">
            <MovieList />
          </div>
        </section>


        {/* Reportes */}
        <section className="dashboard-block">
          <Reports />
        </section>

        {/* Gráficos */}
        <section className="dashboard-charts">
          <div className="chart-card">
            <ChartCategory />
          </div>

          <div className="chart-card">
            <ChartCalification />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
