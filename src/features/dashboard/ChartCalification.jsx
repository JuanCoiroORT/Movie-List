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

  if (movies.length === 0) return null;

  const hoy = new Date();

  let ultimaSemana = 0;
  let ultimos30 = 0;
  let mayores30 = 0;

  movies.forEach((movie) => {
    const fecha = new Date(movie.fechaEstreno + "T00:00:00");
    const diffDays = (hoy.getTime() - fecha.getTime()) / (1000 * 60 * 60 * 24);

    console.log(movie.fechaEstreno, diffDays);

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

  return (
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
  );
}
