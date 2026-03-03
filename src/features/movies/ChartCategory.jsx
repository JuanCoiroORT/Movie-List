import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function ChartsCategory() {
  //State global
  const { list: movies, categories } = useSelector((state) => state.movies);

  //Calculo memoizado
  const data = useMemo(() => {
    if (!movies.length) return [];

    //Mapear idCategoria a nombre
    const categoryMap = categories.reduce((acc, cat) => {
      acc[cat.id] = cat.nombre;
      return acc;
    }, {});

    //Conteo por categoria
    const conteo = movies.reduce((acc, movie) => {
      const nombreCategoria = categoryMap[movie.idCategoria] || "Sin categoria";

      acc[nombreCategoria] = (acc[nombreCategoria] || 0) + 1;
      return acc;
    }, {});

    //Transformar objeto en recharts
    return Object.keys(conteo).map((categoria) => ({
      categoria,
      cantidad: conteo[categoria],
    }));
  }, [movies, categories]);

  // Validacion sin datos
  if (data.length === 0) {
    return (
      <div className="dashboard-card">
        <h2 className="dashboard-card-title">Películas por Categoría</h2>

        <div className="alert alert-info text-center mb-0">
          No hay películas registradas aún
        </div>
      </div>
    );
  }

  // Renderizado
  return (
    <div className="dashboard-card">
      <h2 className="dashboard-card-title">Películas por Categoría</h2>

      <div className="chart-container">
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid stroke="rgba(34,197,94,0.1)" />
            <XAxis dataKey="categoria" stroke="#86efac" />
            <YAxis stroke="#86efac" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f1f17",
                border: "1px solid #14532d",
                borderRadius: "8px",
                color: "#bbf7d0",
              }}
              labelStyle={{ color: "#86efac" }}
            />
            <Bar dataKey="cantidad" fill="#22c55e" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
