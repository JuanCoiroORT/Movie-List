import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../movies/movieSlice";

function Filters() {
  //Hook
  const dispatch = useDispatch();

  //Obtener filtro del estado global
  const filter = useSelector((state) => state.movies.filter) || "all";

  //Handler
  const handleChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div className="dashboard-card dashboard-filter">
      <h3 className="dashboard-card-title">Filtrar por fecha</h3>

      <select value={filter} onChange={handleChange}>
        <option value="all">Todas</option>
        <option value="week">Última semana</option>
        <option value="month">Último mes</option>
      </select>
    </div>
  );
}

export default Filters;
