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
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-success-subtle">
      <div className="card shadow p-4 col-11 col-sm-8 col-md-5 col-lg-4">
        <h1 className="text-center mb-4 fs-4">Iniciar Sesión</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Usuario:</label>
            <input
              type="text"
              className="form-control"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={isDisabled || loading}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>

          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}

          <p className="mt-3 text-center">
            ¿No tenés cuenta?{" "}
            <Link to="/register" className="text-decoration-none">
              Registrate acá
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
