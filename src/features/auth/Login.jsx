import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, clearError } from "./authSlice";
import "../../styles/auth.css";

function Login() {
  // Estados locales
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  //Hooks de librerias
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const isDisabled = usuario.trim() === "" || password.trim() === "";

  // Effect, para limpiar errores al montar componente
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Handlers
  const handleUsuarioChange = ({ target }) => {
    setUsuario(target.value);
  };
  const handlePasswordChange = ({ target }) => {
    setPassword(target.value);
  };
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(loginUser({ usuario, password })).unwrap();
    navigate("/dashboard");
  };

  //Renderizado
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Iniciar Sesión</h1>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Usuario</label>
            <input
              type="text"
              value={usuario}
              onChange={handleUsuarioChange}
            />
          </div>

          <div className="form-group password-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
              />

              <button
                type="button"
                className="toggle-password"
                onClick={togglePassword}
              >
                {showPassword ? "Ocultar" : "Ver"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={isDisabled || loading}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>

          {error && <div className="auth-error">{error}</div>}

          <p className="auth-register">
            ¿No tenés cuenta? <Link to="/register"> Registrate acá</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
