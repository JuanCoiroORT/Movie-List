import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMovie } from "../movies/movieSlice";
import { fetchMovies } from "../movies/movieSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddMovie() {
  const dispatch = useDispatch();
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [fecha, setFecha] = useState(null);
  const categories = useSelector((state) => state.movies.categories);

  const hoy = new Date().toISOString().split("T")[0];

  const isDisabled =
    nombre.trim() === "" || categoria.trim() === "";

  const handleSubmit = (e) => {
    e.preventDefault();

    const fechaFormateada = fecha ? fecha.toISOString().split("T")[0] : null;

    if (fechaFormateada > hoy) {
      alert("La fecha no puede ser posterior a hoy");
      return;
    }

    const newMovie = {
      idCategoria: parseInt(categoria),
      nombre,
      fecha,
    };

    dispatch(addMovie(newMovie)).then(() => {
      dispatch(fetchMovies());
    });

    setNombre("");
    setCategoria("");
    setFecha("");
  };

  return (
    <div className="dashboard-card">
      <h2 className="dashboard-card-title">Agregar Película</h2>

      <form onSubmit={handleSubmit} className="dashboard-form">
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Categoría</label>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Seleccionar categoría</option>
            {categories &&
              categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
          </select>
        </div>

        <div className="form-group">
          <label>Fecha de Estreno</label>
          <DatePicker
            selected={fecha}
            onChange={(date) => setFecha(date)}
            maxDate={new Date()}
            className="movie-date-input"
            calendarClassName="custom-calendar"
            dateFormat="yyyy-MM-dd"
          />
        </div>

        <button
          type="submit"
          className="dashboard-button"
          disabled={isDisabled}
        >
          Agregar Película
        </button>
      </form>
    </div>
  );
}

export default AddMovie;
