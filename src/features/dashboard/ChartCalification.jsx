import { useSelector } from "react-redux";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#52c41a", "#1890ff", "#faad14"];

export default function ChartCalification() {
  const movies = useSelector((state) => state.movies.list);

  const hoy = new Date();

  let ultimaSemana = 0;
  let ultimos30 = 0;
  let mayores30 = 0;

  movies.forEach((movie) => {
    const fecha = new Date(movie.fechaEstreno + "T00:00:00");
    const diffDays = (hoy.getTime() - fecha.getTime()) / (1000 * 60 * 60 * 24);

    if (diffDays <= 7) {
      ultimaSemana++;
    } else if (diffDays <= 30) {
      ultimos30++;
    } else {
      mayores30++;
    }
  });

  const data = [
    { name: "Última semana", value: ultimaSemana },
    { name: "Últimos 30 días", value: ultimos30 },
    { name: "Más de 30 días", value: mayores30 },
  ];

  const total = ultimaSemana + ultimos30 + mayores30;
  if(total === 0){
    return(
      <div className="card shadow-sm p-4 mb-4 text-center">
        <h4 className="mb-3">Peliculas por Antigüedad</h4>
        <div className="alert alert-info text-center mb-0">
          No hay películas registradas aún
        </div>
      </div>
    )
  }

  return (
    <div className="card shadow-sm p-4 mb-4">
      <h4 className="text-center mb-4">Películas por Antigüedad</h4>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
