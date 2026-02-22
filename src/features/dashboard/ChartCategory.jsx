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

export default function Charts() {
    const movies = useSelector((state) => state.movies.list);

    //Conteo por categoria
    const conteo = movies.reduce((acc, movie) => {
      acc[movie.categoria] = (acc[movie.categoria] || 0) + 1;
      return acc;
    }, {});

    //Transformar a formato para recharts
    const data = Object.keys(conteo).map((categoria) => ({
      categoria,
      cantidad: conteo[categoria],
    }));

    return (
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="categoria" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cantidad" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
    );
}

