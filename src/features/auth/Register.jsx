import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser, fetchCountries, clearError } from "./authSlice";
import "../../styles/auth.css";

function Register() {
  //Estados loacales
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [idCountry, setIdCountry] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState(null);

  //Hooks de librerias
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, token, countries, countriesStatus } = use(
    (state) => state.auth,
  );

  //Valores derivados
  const isDisabled =
    username.trim() === "" || password.trim() === "" || idCountry === "";

  //Effects
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (countriesStatus === "idle") {
      dispatch(fetchCountries());
    }
  }, [countriesStatus, dispatch]);

  //Handlers
  const handleUsernameChange = ({ target }) => {
    setUsername(target.value);
  };
  const handlePasswordChange = ({ target }) => {
    setPassword(target.value);
  };
  const handleCountryChange = ({ target }) => {
    setIdCountry(target.value);
  };
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Validaciones
    if (username.length < 3) {
      setValidationError("El usuario deb tener al menos 3 caracteres");
      return;
    }
    if (password.length < 6) {
      setValidationError("La password debe tener al menos 6 caracteres");
      return;
    }

    setValidationError(null);

    await dispatch(
      registerUser({
        usuario: username,
        password: password,
        idPais: parseInt(idCountry),
      }),
    ).unwrap();
    navigate("/dashboard");
  };

  // Renderizado
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
              onChange={handleUsernameChange}
            />
          </div>

          <div className="form-group">
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

          <div className="form-group">
            <label>Country</label>
            <select
              value={idCountry}
              onChange={handleCountryChange}
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
