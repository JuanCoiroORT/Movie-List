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
  if(data.length === 0){
    return (
      <div className="card shadow-sm p-4 mb-4 text-center">
        <h4 className="mb-3">Películas por categoría</h4>
        <div className="alert alert-info text-center mb-0">
          No hay películas registradas aún
        </div>
      </div>
    )
  }

  return (
    <div className="card shadow-sm p-4 mb-4">
      <h4 className="text-center mb-4">Películas por Categoría</h4>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="categoria" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="cantidad" fill="#198754" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
