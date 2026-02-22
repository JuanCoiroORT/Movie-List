import { useSelector } from "react-redux";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#ff4d4f", "#1890ff"];

export default function ChartCalification() {
  const movies = useSelector((state) => state.movies.list);

  const total = movies.length;
  const mas12 = movies.filter((movie) => movie.edadMinima >= 12).length;
  const resto = total - mas12;

  const data = [
    { name: "+12", value: mas12 },
    { name: "Menores de 12", value: resto },
  ];

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={130}
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
