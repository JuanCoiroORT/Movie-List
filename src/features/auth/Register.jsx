import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser, fetchCountries } from "./authSlice";

function Register() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const countries = useSelector((state) => state.auth.countries);
  const countriesStatus = useSelector((state) => state.auth.countriesStatus);

  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [idCountry, setIdCountry] = useState("");

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
    if (username.length < 3) return;
    if (password.length < 6) return;
    try {
      await dispatch(
        registerUser({
          usuario: username,
          password: password,
          idPais: idCountry,
        }),
      ).unwrap();
      navigate("/dashboard");
    } catch (error) {
      // Redux maneja el error en el estado, así que no es necesario hacer nada aquí
    }
  };

  return (
    <div>
      <h2>Register Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <div>
          <label>Country:</label>
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

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={isDisabled}>
          Registrarse
        </button>
      </form>
    </div>
  );
}

export default Register;
