import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../movies/movieSlice";

function Filters() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.movies.filter);

  return (
    <div className="card shadow-sm p-3 mb-4 col-12 col-md-6 col-lg-4 mx-auto">
      <h5 className="text-center mb-3">Filtro</h5>

      <select
        className="form-select"
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
