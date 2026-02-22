import { useSelector } from "react-redux";

function Reports() {
  const movies = useSelector((state) => state.movies.list);

  if (movies.length === 0) {
    return <p>No hay datos para mostrar informes</p>;
  }

  //Categoria favorita

  const conteo = {};

  movies.forEach((movie) => {
    conteo[movie.categoria] = (conteo[movie.categoria] || 0) + 1;
  });

  const valores = Object.values(conteo);
  const maxCantidad = Math.max(...valores);

  const categoriasConMax = Object.keys(conteo).filter(
    (categoria) => conteo[categoria] === maxCantidad,
  );

  let categoriaFavorita = null;

  if (categoriasConMax.length === 1) {
    categoriaFavorita = categoriasConMax[0];
  }

  //Situacion personal
  const comedias = conteo["Comedia"] || 0;
  const accion = conteo["Acción"] || 0;
  const drama = conteo["Drama"] || 0;

  let estado = "😐";

  if (comedias > accion && comedias > drama) {
    estado = "😂";
  }
  if (accion > comedias && accion > drama) {
    estado = "💪";
  }
  if (drama > comedias && drama > accion) {
    estado = "😭";
  }

  return (
    <div>
      <h2>Informes</h2>
      <p>
        Categoría favorita: {""}
        {categoriaFavorita ? categoriaFavorita : "No hay categoría favorita"}
      </p>
      <p>Situación personal: {estado}</p>
    </div>
  );
}

export default Reports;
