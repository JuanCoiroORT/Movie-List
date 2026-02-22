import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {registerSuccess, registerError} from './authSlice';



function Register() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.registerError);
  const users = useSelector((state) => state.auth.users);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isDisabled = email.trim() === '' || password.trim() === '';

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      dispatch(registerError("El email ya está registrado"));
      return;
    }

    //Validacion email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      dispatch(registerError("El email no es válido"));
      return;
    }

    //Validacion password
    if (password.length < 6) {
      dispatch(registerError("La contraseña debe tener al menos 6 caracteres"));
      return;
    }

    const newUser = {
      id: Date.now(),
      email,
      password,
    }

    dispatch(registerSuccess(newUser));
    alert("Usuario registrado exitosamente");

    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <h2>Register Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        {error && <p style={{color: 'red'}}>{error}</p>}

        <button type="submit" disabled={isDisabled}>
          Registrarse
        </button>
      </form>
    </div>
  );
}

export default Register;