import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../movies/movieSlice";


function Filters() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.movies.filter);

  return (
    <div className="dashboard-card dashboard-filter">
      <h3 className="dashboard-card-title">Filtrar por fecha</h3>

      <select
        value={filter}
        onChange={(e) => dispatch(setFilter(e.target.value))}
      >
        <option value="all">Todas</option>
        <option value="week">Última semana</option>
        <option value="month">Último mes</option>
      </select>
    </div>
  );
}

export default Filters;
