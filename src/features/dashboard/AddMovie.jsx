import { useState } from "react";
import { useDispatch } from "react-redux";
import { addMovie } from "../movies/movieSlice";

function AddMovie() {
  const dispatch = useDispatch();
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [fecha, setFecha] = useState("");
  const [edadMinima, setEdadMinima] = useState("");

  const hoy = new Date().toISOString().split("T")[0];

  const isDisabled =
    nombre.trim() === "" ||
    categoria.trim() === "" ||
    fecha.trim() === "" ||
    edadMinima.trim() === "";

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(fecha > hoy) {
            alert("La fecha no puede ser posterior a hoy");
            return;
        }

        const newMovie = {
            id: Date.now(),
            nombre,
            categoria,
            fecha,
            edadMinima: parseInt(edadMinima)
        };

        dispatch(addMovie(newMovie));

        setNombre("");
        setCategoria("");
        setFecha("");
        setEdadMinima("");
    };

    return (
        <div>
            <h2>Agregar Película</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                <div>
                    <label>Categoría:</label>
                    <select
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                    >
                        <option value="">Seleccionar categoría</option>
                        <option value="Acción">Acción</option>
                        <option value="Comedia">Comedia</option>
                        <option value="Drama">Drama</option>
                    </select>
                </div>

                <div>
                    <label>Fecha de Estreno:</label>
                    <input
                        type="date"
                        value={fecha}
                        max = {hoy}
                        onChange={(e) => setFecha(e.target.value)}
                    />
                </div>

                <div>
                    <label>Edad Mínima:</label>
                    <input
                        type="number"
                        value={edadMinima}
                        onChange={(e) => setEdadMinima(e.target.value)}
                    />
                </div>

                <button type="submit" disabled={isDisabled}>
                    Agregar Película
                </button>
            </form>
        </div>  
    )
}

export default AddMovie;
