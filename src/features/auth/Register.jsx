import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser, fetchCountries, clearError } from "./authSlice";
import "../../styles/auth.css";

function Register() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const countries = useSelector((state) => state.auth.countries);
  const countriesStatus = useSelector((state) => state.auth.countriesStatus);

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [idCountry, setIdCountry] = useState("");
  const [validationError, setValidationError] = useState(null);

  //Traer países al cargar el componente
  useEffect(() => {
    if (countriesStatus === "idle") {
      dispatch(fetchCountries());
    }
  }, [countriesStatus, dispatch]);

  const isDisabled =
    username.trim() === "" || password.trim() === "" || idCountry === "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.length < 3) {
      setValidationError("El usuario deb tener al menos 3 caracteres");
      return;
    }
    if (password.length < 6) {
      setValidationError("La password debe tener al menos 6 caracteres");
      return;
    }
    setValidationError(null);
    try {
      await dispatch(
        registerUser({
          usuario: username,
          password: password,
          idPais: parseInt(idCountry),
        }),
      ).unwrap();
      navigate("/dashboard");
    } catch (error) {
      // Redux maneja el error en el estado, así que no es necesario hacer nada aquí
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Crear Cuenta</h1>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Ocultar" : "Ver"}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Country</label>
            <select
              value={idCountry}
              onChange={(e) => setIdCountry(e.target.value)}
            >
              <option value="">Selecciona un país</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.nombre}
                </option>
              ))}
            </select>
          </div>

          {validationError && (
            <div className="auth-error">{validationError}</div>
          )}

          {error && <div className="auth-error">{error}</div>}

          <button
            type="submit"
            className="auth-button"
            disabled={isDisabled || loading}
          >
            {loading ? "Creando..." : "Registrarse"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
