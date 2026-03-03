import { useSelector } from "react-redux";
import { useMemo } from "react";

function Reports() {
  //Estados globales
  const movies = useSelector((state) => state.movies.list) || [];
  const categories = useSelector((state) => state.movies.categories) || [];

  // Mapeo de emojis
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

  //Calculo memoizado
  const { categoriaFavorita, emojiFavorito } = useMemo(() => {
    if (!movies.length || !categories.length) {
      return { categoriaFavorita: null, emojiFavorito: "😐" };
    }

    //Crear mapa
    const categoryMap = categories.reduce((acc, cat) => {
      acc[cat.id] = cat.nombre;
      return acc;
    }, {});

    // Conteo por categoria
    const conteo = movies.reduce((acc, movie) => {
      const nombreCategoria = categoryMap[movie.idCategoria] || "Sin categoría";

      acc[nombreCategoria] = (acc[nombreCategoria] || 0) + 1;
      return acc;
    }, {});

    //Determinar categoria con mayor cantidad
    const maxCantidad = Math.max(...Object.values(conteo));

    const categoriasConMax = Object.keys(conteo).filter(
      (categoria) => conteo[categoria] === maxCantidad,
    );

    const categoriaFavorita =
      categoriasConMax.length === 1 ? categoriasConMax[0] : null;

    const emojiFavorito = categoriaFavorita
      ? categoriaEmojis[categoriaFavorita] || "🎬"
      : "😐";
    return { categoriaFavorita, emojiFavorito };
  }, [movies, categories]);
  //Validacion visual
  if (!movies.length || !categories.length) {
    return (
      <div className="dashboard-card">
        <h2 className="dashboard-card-title">Informes</h2>
        <div className="alert alert-info text-center mb-0">
          No hay películas registradas aún
        </div>
      </div>
    );
  }

  //Renderizado
  return (
    <div className="dashboard-card">
      <h2 className="dashboard-card-title">Informes</h2>

      <div className="reports-container">
        <div className="report-block">
          <span className="report-label">Categoría favorita</span>
          <div className="report-value">
            {categoriaFavorita
              ? categoriaFavorita
              : "No hay categoría favorita"}
          </div>
        </div>

        <div className="report-block">
          <span className="report-label">Situación Personal</span>
          <div className="report-emoji">{emojiFavorito}</div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
