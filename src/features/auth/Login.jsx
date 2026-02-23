import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "./authSlice";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, token } = useSelector((state) => state.auth);

  const isDisabled = usuario.trim() === "" || password.trim() === "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(loginUser({ usuario, password })).unwrap();
      navigate("/dashboard");
    } catch (error) {
      // Redux maneja el error en el estado, así que no es necesario hacer nada aquí
    }
  };

  return (
    <div>
      <h1>Login Page</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario:</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" disabled={isDisabled || loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p>
          ¿No tenés cuenta? <Link to="/register">Registrate acá</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
