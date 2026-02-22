import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginError } from "./authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const isDisabled = usuario.trim() === "" || password.trim() === "";

  const dispatch = useDispatch();

  const error = useSelector((state) => state.auth.error);

  const navigate = useNavigate();

  const users = useSelector((state) => state.auth.users);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = users.find(
      (user) => user.email === usuario && user.password === password,
    );

    if (!user) {
      dispatch(loginError("Credenciales inválidas"));
      return;
    }

    const authData = {
      user: { username: usuario },
      token: "fake-token",
    };
    dispatch(loginSuccess(authData));

    localStorage.setItem("auth", JSON.stringify(authData));
    navigate("/dashboard");
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

        <button type="submit" disabled={isDisabled}>
          Ingresar
        </button>
        <p>
          ¿No tenés cuenta? <Link to="/register">Registrate acá</Link>
        </p>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default Login;
