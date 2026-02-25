import { useSelector } from "react-redux";

function Reports() {
  const movies = useSelector((state) => state.movies.list);
  const categories = useSelector((state) => state.movies.categories);

  if (movies.length === 0 || categories.length === 0) {
    return <p>No hay datos para mostrar informes</p>;
  }

  // Mapeo de categorías a emojis
  const categoriaEmojis = {
    Acción: "💪",
    Drama: "😭",
    Comedia: "😂",
    "Ciencia Ficción": "👽",
    Terror: "😱",
    Animación: "🎨",
    Documental: "📚",
    Romance: "❤️",
    Aventura: "🏔️",
    Fantasía: "🧙‍♂️",
  };

  //Mapear idCateoria de la pelicula al nombre de la categoria
  const moviesConNombreCategoria = movies.map((movie) => {
    const cat = categories.find((c) => c.id === movie.idCategoria);
    return { ...movie, categoria: cat ? cat.nombre : "Sin categoría" };
  });

  //Conteo por categoria
  const conteo = {};
  moviesConNombreCategoria.forEach((movie) => {
    const nombreCategoria = movie.categoria;
    conteo[nombreCategoria] = (conteo[nombreCategoria] || 0) + 1;
  });

  //Determinar categoria favorita
  const valores = Object.values(conteo);
  const maxCantidad = Math.max(...valores);
  const categoriasConMax = Object.keys(conteo).filter(
    (categoria) => conteo[categoria] === maxCantidad,
  );
  let categoriaFavorita =
    categoriasConMax.length === 1 ? categoriasConMax[0] : null;

  //Emoji segun categoria favorita
  const emojiFavorito = categoriaFavorita
    ? categoriaEmojis[categoriaFavorita]
    : "😐";

  return (
    <div>
      <h2>Informes</h2>
      <p>
        Categoría favorita:{" "}
        {categoriaFavorita ? categoriaFavorita : "No hay categoría favorita"}{" "}
      </p>
      <p>
        Situación Personal: {emojiFavorito}
      </p>
    </div>
  );
}

export default Reports;
