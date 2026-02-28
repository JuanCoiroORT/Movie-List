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
  const movies = useSelector((state) => state.movies.list);
  const categories = useSelector((state) => state.movies.categories);

  //Mapear idCategoria a nombre
  const categoryMap = categories.reduce((acc, cat) => {
    acc[cat.id] = cat.nombre;
    return acc;
  }, {});

  //Conteo por categoria
  const conteo = movies.reduce((acc, movie) => {
    const nombreCategoria = categoryMap[movie.idCategoria] || "Sin categoría";
    acc[nombreCategoria] = (acc[nombreCategoria] || 0) + 1;
    return acc;
  }, {});

  //Transformar a formato para recharts
  const data = Object.keys(conteo).map((categoria) => ({
    categoria,
    cantidad: conteo[categoria],
  }));

  //No construir grafico mientras no haya peliculas ingresadas
  if (data.length === 0) {
    return (
      <div className="card shadow-sm p-4 mb-4 text-center">
        <h4 className="mb-3">Películas por categoría</h4>
        <div className="alert alert-info text-center mb-0">
          No hay películas registradas aún
        </div>
      </div>
    );
  }

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
