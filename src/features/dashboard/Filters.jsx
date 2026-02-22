import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../movies/movieSlice";

function Filters() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.movies.filter);

  return (
    <div>
      <h2>Filtro</h2>
      <select
        value={filter}
        onChange={(e) => dispatch(setFilter(e.target.value))}
      >
        <option value="All">Todas</option>
        <option value="week">Última semana</option>
        <option value="month">Último mes</option>
      </select>
    </div>
  );
}

export default Filters;
