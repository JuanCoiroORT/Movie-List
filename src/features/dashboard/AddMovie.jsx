import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMovie } from "../movies/movieSlice";
import { fetchMovies } from "../movies/movieSlice";

function AddMovie() {
  const dispatch = useDispatch();
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [fecha, setFecha] = useState("");
  const categories = useSelector((state) => state.movies.categories);

  const hoy = new Date().toISOString().split("T")[0];

  const isDisabled =
    nombre.trim() === "" || categoria.trim() === "" || fecha.trim() === "";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (fecha > hoy) {
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
    <div className="container py-4">
      <div className="card shadow p-4 col-12 col-md-8 col-lg-6 mx-auto">
        <h2 className="text-center mb-4">Agregar Película</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre:</label>
            <input
              type="text"
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Categoría:</label>
            <select
              className="form-select"
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

          <div className="mb-3">
            <label className="form-label">Fecha de Estreno:</label>
            <input
              type="date"
              className="form-control"
              value={fecha}
              max={hoy}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={isDisabled}
          >
            Agregar Película
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddMovie;
