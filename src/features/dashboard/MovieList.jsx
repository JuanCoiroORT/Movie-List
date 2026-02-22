import { useSelector, useDispatch } from "react-redux";
import { deleteMovie } from "../movies/movieSlice";

function MovieList() {
  const dispatch = useDispatch();
  /*
  const movies = useSelector((state) => state.movies.list);*/

  const { list, filter } = useSelector((state) => state.movies);

  const hoy = new Date();

  const filteredMovies = list.filter((movie) => {
    if (filter === "all") return true;

    const fechaPelicula = new Date(movie.fecha);
    const diffDays = (hoy - fechaPelicula) / (1000 * 60 * 60 * 24);

    if (filter === "week") return diffDays <= 7;
    if (filter === "month") return diffDays <= 30;

    return true;
  });

  if (filteredMovies.length === 0) {
    return <p>No hay películas registradas.</p>;
  }

  return (
    <div>
      <h2>Lista de Películas</h2>
      <ul>
        {filteredMovies.map((movie) => (
          <li key={movie.id}>
            <strong>{movie.nombre}</strong> - {movie.categoria} - {movie.fecha}
            <button onClick={() => dispatch(deleteMovie(movie.id))}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
