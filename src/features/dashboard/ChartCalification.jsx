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
  if (total === 0) {
    return (
      <div className="card shadow-sm p-4 mb-4 text-center">
        <h4 className="mb-3">Peliculas por Antigüedad</h4>
        <div className="alert alert-info text-center mb-0">
          No hay películas registradas aún
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-card">
      <h2 className="dashboard-card-title">Películas por Antigüedad</h2>

      <div className="chart-container">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    ["#14532d", "#166534", "#15803d", "#16a34a", "#22c55e"][
                      index % 5
                    ]
                  }
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#0f1f17",
                border: "1px solid #14532d",
                borderRadius: "8px",
                color: "#bbf7d0",
              }}
              labelStyle={{ color: "#86efac" }}
            />

            <Legend
              wrapperStyle={{
                color: "#86efac",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
