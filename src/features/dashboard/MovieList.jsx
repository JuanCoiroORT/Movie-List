import { useSelector, useDispatch } from "react-redux";
import { deleteMovie } from "../movies/movieSlice";

function MovieList() {
  const dispatch = useDispatch();

  const movies = useSelector((state) => state.movies.list);
  const filter = useSelector((state) => state.movies.filter);

  const hoy = new Date();

  const filteredMovies = movies.filter((movie) => {
    if (filter === "all") return true;

    if (!movie.fechaEstreno) return false;

    const fechaPelicula = new Date(movie.fechaEstreno);
    const diffTime = hoy.getTime() - fechaPelicula.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays < 0) return false;

    if (filter === "week") return diffDays <= 7;
    if (filter === "month") return diffDays <= 30;

    return true;
  });

  return (
    <div className="card shadow-sm p-4 mb-4">
      <h4 className="text-center mb-4">Lista de Películas</h4>

      {filteredMovies.length === 0 ? (
        <div className="alert alert-info text-center mb-0">
          No hay películas para mostrar
        </div>
      ) : (
        <ul className="list-group">
          {filteredMovies.map((movie) => (
            <li
              key={movie.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{movie.nombre}</strong>
                <div className="text-muted small">
                  {movie.categoria} — {movie.fechaEstreno}
                </div>
              </div>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => dispatch(deleteMovie(movie.id))}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MovieList;
