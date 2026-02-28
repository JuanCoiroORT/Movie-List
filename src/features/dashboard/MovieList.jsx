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
    <div className="dashboard-card">
      <h2 className="dashboard-card-title">Lista de Películas</h2>

      {filteredMovies.length === 0 ? (
        <div className="movie-empty">No hay películas para mostrar</div>
      ) : (
        <ul className="movie-list">
          {filteredMovies.map((movie) => (
            <li key={movie.id} className="movie-item">
              <div className="movie-info">
                <strong>{movie.nombre}</strong>
                <span className="movie-meta">
                  {movie.categoria} — {movie.fechaEstreno}
                </span>
              </div>

              <button
                className="movie-delete"
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
